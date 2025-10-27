const mailchimpTx: any = require('@mailchimp/mailchimp_transactional')

// Environment variables
const MANDRILL_API_KEY = process.env.MANDRILL_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'webinfo@milletglow.com'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'webinfo@milletglow.com'
const COMPANY_NAME = 'MilletGlow'
const COMPANY_WEBSITE = 'https://milletglow.in'

console.log('📧 Email Configuration:')
console.log('  FROM_EMAIL:', FROM_EMAIL)
console.log('  ADMIN_EMAIL:', ADMIN_EMAIL)
console.log('  MANDRILL_API_KEY:', MANDRILL_API_KEY ? 'Configured' : 'Missing')

// Initialize Mandrill client
let mandrill: any = null
try {
  if (MANDRILL_API_KEY) {
    mandrill = mailchimpTx(MANDRILL_API_KEY)
    console.log('✅ Mandrill client initialized successfully')
  } else {
    console.warn('⚠️ MANDRILL_API_KEY is not configured. Email sending will be disabled.')
  }
} catch (err) {
  console.error('❌ Failed to initialize Mandrill client:', err)
}

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Contact form data interface
interface ContactFormData {
  name: string
  email: string
  phone?: string
  organization?: string
  message: string
}

// Newsletter subscription data interface
interface NewsletterData {
  name?: string
  email: string
  source?: string
}

/**
 * Send contact form confirmation email to the user
 * Note: Currently disabled due to Mandrill domain restrictions
 */
export async function sendContactConfirmation(contactData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mandrill) {
      return { success: false, error: 'Email service not configured' }
    }

    if (!isValidEmail(contactData.email)) {
      return { success: false, error: 'Invalid email address' }
    }

    // Skip user confirmation due to Mandrill domain restrictions
    // Admin will manually respond to contact inquiries
    console.log('📧 Contact confirmation skipped for:', contactData.email, '(Mandrill domain restriction)')
    return {
      success: true,
      error: 'User confirmation handled manually by admin'
    }

    const message = {
      from_email: FROM_EMAIL,
      from_name: COMPANY_NAME,
      subject: `Thank you for contacting ${COMPANY_NAME}! 🌾`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting ${COMPANY_NAME}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f6f4e8 0%, #e8f5e8 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; color: #2d5016; margin-bottom: 10px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .message-box { background: #f9f9f9; padding: 20px; border-left: 4px solid #2d5016; margin: 20px 0; }
            .footer { background: #f8f8f8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
            .btn { display: inline-block; background: #2d5016; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
            .highlight { color: #2d5016; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">${COMPANY_NAME}</div>
              <p style="margin: 0; color: #666;">Premium Organic Millet Products</p>
            </div>

            <div class="content">
              <h2 style="color: #2d5016; margin-top: 0;">Thank you for reaching out, ${contactData.name}!</h2>

              <p>We've received your message and our team will get back to you within <span class="highlight">24 hours</span>.</p>

              <div class="message-box">
                <h3 style="margin-top: 0; color: #2d5016;">Your Message Details:</h3>
                <p><strong>👤 Name:</strong> ${contactData.name}</p>
                <p><strong>📧 Email:</strong> ${contactData.email}</p>
                <p><strong>📱 Phone:</strong> ${contactData.phone || 'Not provided'}</p>
                <p><strong>🏢 Organization:</strong> ${contactData.organization || 'Not specified'}</p>
                <p><strong>💬 Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${contactData.message}</p>
              </div>

              <p>In the meantime, feel free to explore our premium millet products:</p>
              <a href="${COMPANY_WEBSITE}/products" class="btn">Browse Products</a>

              <p>Follow us for health tips and product updates:</p>
              <p>
                🌐 Website: <a href="${COMPANY_WEBSITE}">${COMPANY_WEBSITE}</a><br>
                📱 WhatsApp: <a href="https://wa.me/+919876543210">+91 98765 43210</a>
              </p>
            </div>

            <div class="footer">
              <p>Best regards,<br><strong>The ${COMPANY_NAME} Team</strong></p>
              <p style="font-size: 12px; color: #999;">
                This is an automated confirmation email. Please do not reply to this email.<br>
                If you need immediate assistance, contact us at <a href="mailto:${FROM_EMAIL}">${FROM_EMAIL}</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${contactData.name},

Thank you for reaching out to ${COMPANY_NAME}! 🌾

We've received your message and our team will get back to you within 24 hours.

Here's a copy of your submission:
👤 Name: ${contactData.name}
📧 Email: ${contactData.email}
📱 Phone: ${contactData.phone || 'Not provided'}
🏢 Organization: ${contactData.organization || 'Not specified'}

💬 Message:
${contactData.message}

In the meantime, feel free to explore our premium millet products at ${COMPANY_WEBSITE}/products

Best regards,
The ${COMPANY_NAME} Team
${COMPANY_WEBSITE}

---
This is an automated confirmation email. Please do not reply to this email.
If you need immediate assistance, contact us at ${FROM_EMAIL}
      `,
      to: [{ email: contactData.email, name: contactData.name, type: 'to' }],
      headers: {
        'Reply-To': FROM_EMAIL,
        'X-Mailer': 'MilletGlow Contact System',
        'X-Priority': '3'
      },
      track_opens: true,
      track_clicks: true,
      auto_text: true,
      auto_html: false,
      tags: ['contact-confirmation']
    }

    const response = await mandrill.messages.send({ message })

    if (response[0]?.status === 'rejected') {
      const rejectionReason = response[0]?.reject_reason
      console.error('⚠️ Mandrill rejected confirmation email:', rejectionReason)
      console.error('📊 Full Mandrill response:', JSON.stringify(response[0], null, 2))
      console.error('📧 Message details:', { from_email: FROM_EMAIL, to_email: contactData.email })
      return { success: false, error: `Confirmation email was rejected: ${rejectionReason}` }
    }

    console.log('✅ Contact confirmation email sent to:', contactData.email)
    return { success: true }
  } catch (error: any) {
    console.error('❌ Failed to send contact confirmation:', error)
    return { success: false, error: 'Failed to send confirmation email' }
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(contactData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mandrill) {
      return { success: false, error: 'Email service not configured' }
    }

    const message = {
      from_email: FROM_EMAIL,
      from_name: COMPANY_NAME,
      subject: `🔔 New Contact Form Submission - ${contactData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2d5016; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .field { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #2d5016; }
            .message-content { background: #fff; padding: 20px; border: 2px solid #2d5016; border-radius: 5px; margin: 15px 0; }
            .footer { background: #f8f8f8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
            .urgent { background: #fee; border-left-color: #f44; }
            .btn { display: inline-block; background: #2d5016; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🔔 New Contact Form Submission</h2>
              <p style="margin: 5px 0 0;">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>

            <div class="content">
              <h3 style="color: #2d5016; margin-top: 0;">Contact Details:</h3>

              <div class="field">
                <strong>👤 Name:</strong> ${contactData.name}
              </div>

              <div class="field">
                <strong>📧 Email:</strong>
                <a href="mailto:${contactData.email}">${contactData.email}</a>
              </div>

              <div class="field">
                <strong>📱 Phone:</strong>
                ${contactData.phone ? `<a href="tel:+91${contactData.phone}">+91 ${contactData.phone}</a>` : 'Not provided'}
              </div>

              <div class="field">
                <strong>🏢 Organization:</strong> ${contactData.organization || 'Not specified'}
              </div>

              <div class="message-content">
                <strong>💬 Message:</strong>
                <p style="margin: 10px 0 0; white-space: pre-wrap;">${contactData.message}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${contactData.email}?subject=Re: Your inquiry to ${COMPANY_NAME}" class="btn">Reply via Email</a>
                ${contactData.phone ? `<a href="tel:+91${contactData.phone}" class="btn">Call Customer</a>` : ''}
                <a href="https://wa.me/+91${contactData.phone}?text=Hi ${contactData.name}, thank you for contacting ${COMPANY_NAME}!" class="btn">WhatsApp</a>
              </div>
            </div>

            <div class="footer">
              <p><strong>Action Required:</strong> Please respond within 24 hours</p>
              <p style="font-size: 12px; color: #999;">
                ${COMPANY_NAME} Admin Panel<br>
                This notification was sent from ${COMPANY_WEBSITE}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🔔 NEW CONTACT FORM SUBMISSION
Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

CONTACT DETAILS:
👤 Name: ${contactData.name}
📧 Email: ${contactData.email}
📱 Phone: ${contactData.phone || 'Not provided'}
🏢 Organization: ${contactData.organization || 'Not specified'}

💬 MESSAGE:
${contactData.message}

ACTION REQUIRED: Please respond within 24 hours

Quick Actions:
- Reply: mailto:${contactData.email}
${contactData.phone ? `- Call: tel:+91${contactData.phone}` : ''}
${contactData.phone ? `- WhatsApp: https://wa.me/+91${contactData.phone}` : ''}

${COMPANY_NAME} Admin Panel
This notification was sent from ${COMPANY_WEBSITE}
      `,
      to: [{ email: ADMIN_EMAIL, type: 'to' }],
      headers: { 'Reply-To': contactData.email },
      track_opens: true,
      track_clicks: true,
      auto_text: true,
      tags: ['contact-admin-notification'],
      important: true
    }

    const response = await mandrill.messages.send({ message })

    console.log('📊 Mandrill Response for Contact Admin:', JSON.stringify(response[0], null, 2))

    if (response[0]?.status === 'rejected') {
      console.error('⚠️ Mandrill rejected admin notification:', response[0]?.reject_reason)
      return { success: false, error: `Admin notification was rejected: ${response[0]?.reject_reason}` }
    }

    if (response[0]?.status === 'sent') {
      console.log('✅ Contact admin notification sent to:', ADMIN_EMAIL)
      console.log('📬 Message ID:', response[0]?._id)
      return { success: true }
    } else {
      console.warn('⚠️ Unexpected Mandrill status:', response[0]?.status)
      return { success: false, error: `Unexpected status: ${response[0]?.status}` }
    }
  } catch (error: any) {
    console.error('❌ Failed to send contact admin notification:', error)
    return { success: false, error: 'Failed to send admin notification' }
  }
}

/**
 * Send newsletter subscription confirmation
 * Note: Currently disabled due to Mandrill domain restrictions
 */
export async function sendNewsletterConfirmation(newsletterData: NewsletterData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mandrill) {
      return { success: false, error: 'Email service not configured' }
    }

    if (!isValidEmail(newsletterData.email)) {
      return { success: false, error: 'Invalid email address' }
    }

    // Skip user confirmation due to Mandrill domain restrictions
    // Admin will manually send welcome emails
    console.log('📧 Newsletter confirmation skipped for:', newsletterData.email, '(Mandrill domain restriction)')
    return {
      success: true,
      error: 'User confirmation handled manually by admin'
    }

    const message = {
      from_email: FROM_EMAIL,
      from_name: COMPANY_NAME,
      subject: `Welcome to ${COMPANY_NAME} Newsletter! 🌾`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ${COMPANY_NAME} Newsletter</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f6f4e8 0%, #e8f5e8 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .logo { font-size: 32px; font-weight: bold; color: #2d5016; margin-bottom: 10px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .welcome-box { background: #f0f8f0; padding: 25px; border-radius: 10px; margin: 20px 0; text-align: center; }
            .benefits { background: #fff; border: 2px solid #2d5016; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .footer { background: #f8f8f8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
            .btn { display: inline-block; background: #2d5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
            .highlight { color: #2d5016; font-weight: bold; }
            ul { text-align: left; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">${COMPANY_NAME}</div>
              <p style="margin: 0; color: #666; font-size: 18px;">Premium Organic Millet Products</p>
            </div>

            <div class="content">
              <div class="welcome-box">
                <h2 style="color: #2d5016; margin-top: 0;">🎉 Welcome to our healthy family!</h2>
                <p style="font-size: 18px; margin-bottom: 0;">Thank you for subscribing to our newsletter${newsletterData.name ? `, ${newsletterData.name}` : ''}!</p>
              </div>

              <p>You've taken the first step towards a healthier lifestyle with the power of millets.</p>

              <div class="benefits">
                <h3 style="color: #2d5016; margin-top: 0;">What you'll receive:</h3>
                <ul>
                  <li>🌾 <strong>Premium Product Updates:</strong> Be the first to know about new millet varieties</li>
                  <li>💡 <strong>Health Tips:</strong> Expert advice on millet nutrition and wellness</li>
                  <li>📖 <strong>Recipes & Guides:</strong> Delicious and healthy millet recipes</li>
                  <li>🎯 <strong>Exclusive Offers:</strong> Special discounts and early access to sales</li>
                  <li>📰 <strong>Health News:</strong> Latest research on millet benefits and nutrition</li>
                </ul>
              </div>

              <p style="text-align: center;">Start exploring our premium millet collection:</p>
              <div style="text-align: center;">
                <a href="${COMPANY_WEBSITE}/products" class="btn">Shop Premium Millets</a>
              </div>

              <p style="font-size: 16px; text-align: center; margin-top: 30px;">
                <strong>Need help?</strong> Contact us anytime:<br>
                📧 <a href="mailto:${FROM_EMAIL}">${FROM_EMAIL}</a><br>
                📱 <a href="https://wa.me/+919876543210">WhatsApp: +91 98765 43210</a>
              </p>
            </div>

            <div class="footer">
              <p><strong>Thank you for choosing ${COMPANY_NAME}!</strong></p>
              <p style="font-size: 12px; color: #999;">
                You're receiving this because you subscribed to our newsletter at ${COMPANY_WEBSITE}<br>
                <a href="${COMPANY_WEBSITE}/unsubscribe?email=${encodeURIComponent(newsletterData.email)}">Unsubscribe</a> |
                <a href="${COMPANY_WEBSITE}/newsletter-preferences">Preferences</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to ${COMPANY_NAME} Newsletter! 🌾

Hi${newsletterData.name ? ` ${newsletterData.name}` : ''}!

🎉 Thank you for subscribing to our newsletter!

You've taken the first step towards a healthier lifestyle with the power of millets.

What you'll receive:
🌾 Premium Product Updates: Be the first to know about new millet varieties
💡 Health Tips: Expert advice on millet nutrition and wellness
📖 Recipes & Guides: Delicious and healthy millet recipes
🎯 Exclusive Offers: Special discounts and early access to sales
📰 Health News: Latest research on millet benefits and nutrition

Start exploring our premium millet collection: ${COMPANY_WEBSITE}/products

Need help? Contact us anytime:
📧 ${FROM_EMAIL}
📱 WhatsApp: +91 98765 43210

Thank you for choosing ${COMPANY_NAME}!

---
You're receiving this because you subscribed at ${COMPANY_WEBSITE}
Unsubscribe: ${COMPANY_WEBSITE}/unsubscribe?email=${encodeURIComponent(newsletterData.email)}
      `,
      to: [{ email: newsletterData.email, name: newsletterData.name || '', type: 'to' }],
      headers: {
        'Reply-To': FROM_EMAIL,
        'X-Mailer': 'MilletGlow Newsletter System',
        'X-Priority': '3'
      },
      track_opens: true,
      track_clicks: true,
      auto_text: true,
      auto_html: false,
      tags: ['newsletter-welcome', 'newsletter-confirmation']
    }

    const response = await mandrill.messages.send({ message })

    if (response[0]?.status === 'rejected') {
      const rejectionReason = response[0]?.reject_reason
      console.error('⚠️ Mandrill rejected newsletter confirmation:', rejectionReason)
      console.error('📊 Full Mandrill response:', JSON.stringify(response[0], null, 2))
      console.error('📧 Message details:', { from_email: FROM_EMAIL, to_email: newsletterData.email })
      return { success: false, error: `Newsletter confirmation was rejected: ${rejectionReason}` }
    }

    console.log('✅ Newsletter confirmation sent to:', newsletterData.email)
    return { success: true }
  } catch (error: any) {
    console.error('❌ Failed to send newsletter confirmation:', error)
    return { success: false, error: 'Failed to send newsletter confirmation' }
  }
}

/**
 * Send newsletter subscription notification to admin
 */
export async function sendNewsletterNotification(newsletterData: NewsletterData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!mandrill) {
      return { success: false, error: 'Email service not configured' }
    }

    const message = {
      from_email: FROM_EMAIL,
      from_name: COMPANY_NAME,
      subject: `📧 New Newsletter Subscription - ${newsletterData.email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Newsletter Subscription</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background: #2d5016; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: white; padding: 20px; border: 1px solid #e0e0e0; }
            .field { margin: 10px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #2d5016; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h3 style="margin: 0;">📧 New Newsletter Subscription</h3>
            </div>
            <div class="content">
              <div class="field">
                <strong>📧 Email:</strong> ${newsletterData.email}
              </div>
              <div class="field">
                <strong>👤 Name:</strong> ${newsletterData.name || 'Not provided'}
              </div>
              <div class="field">
                <strong>📍 Source:</strong> ${newsletterData.source || 'website'}
              </div>
              <div class="field">
                <strong>⏰ Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
📧 NEW NEWSLETTER SUBSCRIPTION

📧 Email: ${newsletterData.email}
👤 Name: ${newsletterData.name || 'Not provided'}
📍 Source: ${newsletterData.source || 'website'}
⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

${COMPANY_NAME} Admin Panel
      `,
      to: [{ email: ADMIN_EMAIL, type: 'to' }],
      track_opens: false,
      track_clicks: false,
      auto_text: true,
      tags: ['newsletter-admin-notification']
    }

    const response = await mandrill.messages.send({ message })

    console.log('📊 Mandrill Response for Newsletter Admin:', JSON.stringify(response[0], null, 2))

    if (response[0]?.status === 'rejected') {
      console.error('⚠️ Mandrill rejected newsletter admin notification:', response[0]?.reject_reason)
      return { success: false, error: `Newsletter admin notification was rejected: ${response[0]?.reject_reason}` }
    }

    if (response[0]?.status === 'sent') {
      console.log('✅ Newsletter admin notification sent to:', ADMIN_EMAIL)
      console.log('📬 Message ID:', response[0]?._id)
      return { success: true }
    } else {
      console.warn('⚠️ Unexpected Mandrill status:', response[0]?.status)
      return { success: false, error: `Unexpected status: ${response[0]?.status}` }
    }
  } catch (error: any) {
    console.error('❌ Failed to send newsletter admin notification:', error)
    return { success: false, error: 'Failed to send newsletter admin notification' }
  }
}

/**
 * Process contact form with dual email functionality
 */
export async function processContactForm(contactData: ContactFormData): Promise<{ success: boolean; error?: string; details?: any }> {
  try {
    // Send both emails in parallel for better performance
    const [confirmationResult, notificationResult] = await Promise.allSettled([
      sendContactConfirmation(contactData),
      sendContactNotification(contactData)
    ])

    const confirmation = confirmationResult.status === 'fulfilled' ? confirmationResult.value : { success: false, error: 'Confirmation failed' }
    const notification = notificationResult.status === 'fulfilled' ? notificationResult.value : { success: false, error: 'Notification failed' }

    // Consider successful if at least one email was sent
    const overallSuccess = confirmation.success || notification.success

    return {
      success: overallSuccess,
      error: !overallSuccess ? 'Both emails failed to send' : undefined,
      details: {
        confirmation: {
          success: confirmation.success,
          error: confirmation.error
        },
        notification: {
          success: notification.success,
          error: notification.error
        }
      }
    }
  } catch (error: any) {
    console.error('❌ Failed to process contact form:', error)
    return { success: false, error: 'Failed to process contact form' }
  }
}

/**
 * Process newsletter subscription with dual email functionality
 */
export async function processNewsletterSubscription(newsletterData: NewsletterData): Promise<{ success: boolean; error?: string; details?: any }> {
  try {
    // Send both emails in parallel
    const [confirmationResult, notificationResult] = await Promise.allSettled([
      sendNewsletterConfirmation(newsletterData),
      sendNewsletterNotification(newsletterData)
    ])

    const confirmation = confirmationResult.status === 'fulfilled' ? confirmationResult.value : { success: false, error: 'Confirmation failed' }
    const notification = notificationResult.status === 'fulfilled' ? notificationResult.value : { success: false, error: 'Notification failed' }

    // Consider successful if confirmation was sent (notification is less critical)
    const overallSuccess = confirmation.success

    return {
      success: overallSuccess,
      error: !overallSuccess ? 'Failed to send confirmation email' : undefined,
      details: {
        confirmation: {
          success: confirmation.success,
          error: confirmation.error
        },
        notification: {
          success: notification.success,
          error: notification.error
        }
      }
    }
  } catch (error: any) {
    console.error('❌ Failed to process newsletter subscription:', error)
    return { success: false, error: 'Failed to process newsletter subscription' }
  }
}

