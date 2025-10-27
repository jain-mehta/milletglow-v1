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

// Check subscription status in Mailchimp
async function checkMailchimpSubscription(email: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1'

  if (!apiKey || !audienceId) {
    throw new Error('Mailchimp credentials not configured')
  }

  try {
    // Calculate MD5 hash of lowercase email for Mailchimp member ID
    const crypto = require('crypto')
    const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json()
      return {
        subscribed: data.status === 'subscribed',
        subscribedAt: data.timestamp_opt ? new Date(data.timestamp_opt).toISOString() : null,
        status: data.status
      }
    } else if (response.status === 404) {
      // Member not found
      return { subscribed: false, subscribedAt: null, status: 'not_found' }
    } else {
      throw new Error(`Mailchimp API error: ${response.status}`)
    }
  } catch (error) {
    console.error('Mailchimp status check error:', error)
    throw error
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

    // Note: Using MailChimp as primary newsletter storage instead of Sanity
    // This avoids the need for Sanity write permissions

    // Subscribe to Mailchimp (for marketing automation)
    const mailchimpResult = await subscribeToMailchimp(email, name)

    // Send confirmation and notification emails via Mandrill
    const emailResult = await processNewsletterSubscription({
      email,
      name: name || '',
      source: source || 'website'
    })

    // Note: Mailchimp is the primary storage, no Sanity updates needed

    // Determine response message based on results
    let responseMessage = 'Successfully subscribed to newsletter! '
    let responseWarnings = []

    // Check if admin notification worked (this is the key success indicator)
    if (emailResult.success && emailResult.details?.notification.success) {
      responseMessage += 'You\'ve been successfully subscribed! Our team has been notified and will send you a welcome email within 24 hours.'
    } else if (mailchimpResult.success) {
      responseMessage += 'You\'ve been added to our mailing list and will receive our next newsletter update!'
    } else {
      responseMessage = 'Subscription received! Our team will process your request manually.'
      responseWarnings.push('Please contact us directly if you don\'t hear back within 24 hours')
    }

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        warnings: responseWarnings.length > 0 ? responseWarnings : undefined,
        data: {
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

    // Check subscription status via MailChimp instead of Sanity
    // This avoids the need for Sanity read/write permissions
    try {
      const mailchimpStatus = await checkMailchimpSubscription(email)
      return NextResponse.json({
        subscribed: mailchimpStatus.subscribed,
        subscribedAt: mailchimpStatus.subscribedAt || null,
        source: 'mailchimp',
      })
    } catch (mailchimpError) {
      // If MailChimp check fails, assume not subscribed
      return NextResponse.json({
        subscribed: false,
        subscribedAt: null,
        source: null,
      })
    }
  } catch (error) {
    console.error('Newsletter status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}