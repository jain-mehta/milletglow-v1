import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/client'

// Verify reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('reCAPTCHA secret key not configured')
    return false
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score > 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

// Send email notification
async function sendEmailNotification(messageData: any) {
  // In a real implementation, you would integrate with an email service
  // like SendGrid, Mailgun, or use SMTP

  // For now, we'll just log the message
  console.log('New contact form submission:', messageData)

  // You can implement email sending here
  // Example with nodemailer:
  /*
  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: 'admin@milletglow.com',
    subject: `New Contact Form Submission: ${messageData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${messageData.name}</p>
      <p><strong>Email:</strong> ${messageData.email}</p>
      <p><strong>Phone:</strong> ${messageData.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${messageData.subject || 'No subject'}</p>
      <p><strong>Message:</strong></p>
      <p>${messageData.message}</p>
    `,
  })
  */
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, recaptchaToken } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 }
        )
      }
    }

    // Save to Sanity
    const messageDoc = {
      _type: 'message',
      name,
      email,
      phone: phone || '',
      subject: subject || '',
      message,
      source: 'contact-form',
      status: 'new',
      priority: 'medium',
      replied: false,
    }

    const result = await client.create(messageDoc)

    // Send email notification to admin
    await sendEmailNotification({
      name,
      email,
      phone,
      subject,
      message,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        id: result._id
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}