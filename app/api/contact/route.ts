import { NextRequest, NextResponse } from 'next/server'
import { processContactForm } from '@/lib/mandrillService'

/**
 * Verify Google reCAPTCHA token
 */
async function verifyRecaptcha(token: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('❌ reCAPTCHA secret key not configured')
    return { success: false, error: 'reCAPTCHA not properly configured' }
  }

  if (secretKey.length < 20 || secretKey.length > 100) {
    console.error('❌ reCAPTCHA secret key format looks invalid')
    return { success: false, error: 'Invalid reCAPTCHA configuration' }
  }

  if (!token || typeof token !== 'string' || token.length < 20) {
    return { success: false, error: 'Invalid reCAPTCHA token' }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    })

    if (!response.ok) {
      console.error('⚠️ reCAPTCHA API returned an error:', response.status)
      return { success: false, error: 'reCAPTCHA verification service unavailable' }
    }

    const data = await response.json()

    if (!data.success) {
      console.error('❌ reCAPTCHA verification failed:', data['error-codes'])
      return { success: false, error: 'reCAPTCHA verification failed' }
    }

    // reCAPTCHA v2 verification (success/failure only)
    console.log(`🤖 reCAPTCHA v2 Analysis:`)
    console.log(`   Success: ${data.success}`)
    console.log(`   Challenge timestamp: ${data.challenge_ts}`)
    console.log(`   Hostname: ${data.hostname}`)

    // For v2, we only need to check success status
    console.log(`✅ PASSED: reCAPTCHA v2 verification successful`)
    return { success: true }
  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error)
    return { success: false, error: 'reCAPTCHA verification failed' }
  }
}

/**
 * Handle validated contact form submission with dual email functionality
 */
async function processContactSubmission(contactData: {
  name: string
  email: string
  phone: string
  organization: string
  message: string
}): Promise<{ success: boolean; error?: string; details?: any }> {
  try {
    console.log('📨 Contact form submission received:', {
      ...contactData,
      message: contactData.message.slice(0, 80) + (contactData.message.length > 80 ? '...' : ''),
      timestamp: new Date().toISOString(),
    })

    // Process contact form with dual email functionality
    const result = await processContactForm(contactData)

    if (!result.success) {
      console.error('⚠️ Failed to process contact form:', result.error)
      return {
        success: false,
        error: result.error || 'Failed to process contact form',
        details: result.details
      }
    }

    // Log email sending results
    if (result.details) {
      console.log('📧 Email Results:', {
        confirmation: result.details.confirmation.success ? '✅ Sent' : `❌ Failed: ${result.details.confirmation.error}`,
        notification: result.details.notification.success ? '✅ Sent' : `❌ Failed: ${result.details.notification.error}`
      })
    }

    return { success: true, details: result.details }
  } catch (error) {
    console.error('❌ Contact submission error:', error)
    return { success: false, error: 'Internal error while processing contact submission.' }
  }
}

/**
 * Main API handler
 */
export async function POST(request: NextRequest) {
  try {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!siteKey || !secretKey) {
      console.error('❌ Missing reCAPTCHA environment variables')
      return NextResponse.json(
        { error: 'Contact form is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, email, phone, organizationType, customOrganization, message, recaptchaToken } = body

    const errors: string[] = []

    // 🔍 Validate inputs
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50)
      errors.push('Invalid name')

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email || !emailRegex.test(email.trim()))
      errors.push('Invalid email')

    const cleanPhone = (phone || '').replace(/\D/g, '')
    if (!/^[6-9]\d{9}$/.test(cleanPhone))
      errors.push('Invalid Indian phone number format')

    if (!organizationType)
      errors.push('Organization type is required')

    const org = organizationType === 'Others' ? customOrganization : organizationType
    if (!org || org.trim().length < 2)
      errors.push('Invalid organization')

    if (!message || typeof message !== 'string' || message.trim().length < 10)
      errors.push('Message too short')

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 })
    }

    // ✅ Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: recaptchaResult.error || 'Failed reCAPTCHA verification' },
        { status: 400 }
      )
    }

    // ✅ Process contact with dual email functionality
    const result = await processContactSubmission({
      name,
      email,
      phone,
      organization: org,
      message,
    })

    if (result.success) {
      // Determine response message based on email results
      let responseMessage = '✅ Your message has been sent successfully! '

      if (result.details) {
        const { confirmation, notification } = result.details
        if (confirmation.success && notification.success) {
          responseMessage += 'You should receive a confirmation email shortly, and our team will respond within 24 hours.'
        } else if (confirmation.success) {
          responseMessage += 'You should receive a confirmation email shortly. Our team has been notified and will respond within 24 hours.'
        } else if (notification.success) {
          responseMessage += 'Our team has been notified and will respond within 24 hours.'
        } else {
          responseMessage += 'Our team will respond within 24 hours.'
        }
      } else {
        responseMessage += 'Thank you for contacting us!'
      }

      return NextResponse.json(
        {
          success: true,
          message: responseMessage,
          emailDetails: result.details
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: result.error || 'Failed to process contact form.',
        details: result.details
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('❌ Unexpected contact form error:', error)
    return NextResponse.json(
      { error: 'Unexpected server error. Please try again later.' },
      { status: 500 }
    )
  }
}
