import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { processNewsletterSubscription } from '@/lib/mandrillService'

// Mailchimp integration
async function subscribeToMailchimp(email: string, name?: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1'

  if (!apiKey || !audienceId) {
    console.error('Mailchimp credentials not configured')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name?.split(' ')[0] || '',
          LNAME: name?.split(' ').slice(1).join(' ') || '',
        },
        tags: ['website-signup'],
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, data }
    } else {
      // Check if already subscribed
      if (data.title === 'Member Exists') {
        return { success: true, message: 'Already subscribed', data }
      }
      return { success: false, error: data.detail || 'Subscription failed' }
    }
  } catch (error) {
    console.error('Mailchimp subscription error:', error)
    return { success: false, error: 'Failed to subscribe to newsletter' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, source = 'homepage-footer' } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if already subscribed in Sanity
    const existingSubscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    )

    let sanityResult
    if (existingSubscriber) {
      // Update existing subscriber
      sanityResult = await client
        .patch(existingSubscriber._id)
        .set({
          subscribed: true,
          subscribedAt: new Date().toISOString(),
          source,
        })
        .commit()
    } else {
      // Create new subscriber
      const subscriberDoc = {
        _type: 'newsletter',
        email,
        name: name || '',
        source,
        subscribed: true,
        subscribedAt: new Date().toISOString(),
        preferences: {
          productUpdates: true,
          promotions: true,
          healthTips: true,
          newsBlog: true,
        },
      }

      sanityResult = await client.create(subscriberDoc)
    }

    // Subscribe to Mailchimp (for marketing automation)
    const mailchimpResult = await subscribeToMailchimp(email, name)

    // Send confirmation and notification emails via Mandrill
    const emailResult = await processNewsletterSubscription({
      email,
      name: name || '',
      source: source || 'website'
    })

    if (mailchimpResult.success) {
      // Update Sanity record with Mailchimp ID if available
      if (mailchimpResult.data?.id) {
        await client
          .patch(sanityResult._id)
          .set({ mailchimpId: mailchimpResult.data.id })
          .commit()
      }
    }

    // Determine response message based on results
    let responseMessage = 'Successfully subscribed to newsletter! '
    let responseWarnings = []

    if (emailResult.success) {
      if (emailResult.details?.confirmation.success) {
        responseMessage += 'Check your email for a welcome message.'
      }
      if (!emailResult.details?.notification.success) {
        responseWarnings.push('Admin notification failed')
      }
    } else {
      responseWarnings.push('Welcome email delivery failed')
    }

    if (!mailchimpResult.success) {
      responseWarnings.push('Marketing list subscription failed')
    }

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        warnings: responseWarnings.length > 0 ? responseWarnings : undefined,
        data: {
          sanityId: sanityResult._id,
          mailchimpId: mailchimpResult.data?.id,
          emailResult: emailResult.details
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

// GET endpoint to check subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const subscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    )

    return NextResponse.json({
      subscribed: subscriber?.subscribed || false,
      subscribedAt: subscriber?.subscribedAt || null,
      source: subscriber?.source || null,
    })
  } catch (error) {
    console.error('Newsletter status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}