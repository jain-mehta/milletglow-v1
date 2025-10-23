import mailchimpTx from '@mailchimp/mailchimp_transactional'

/**
 * Initialize Mailchimp Transactional (Mandrill)
 */
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@yourdomain.com'

if (!MAILCHIMP_API_KEY) {
  console.warn('⚠️ MAILCHIMP_API_KEY is not configured. Email sending will be disabled.')
}

let mandrill: any = null
try {
  if (MAILCHIMP_API_KEY) {
    mandrill = mailchimpTx(MAILCHIMP_API_KEY)
  }
} catch (err) {
  console.error('❌ Failed to initialize Mandrill client:', err)
}

/**
 * Sends a confirmation or notification email to the contact form submitter.
 */
export async function sendAdminNotification(contactData: {
  name: string
  email: string
  phone?: string
  organization?: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate config
    if (!mandrill) {
      console.error('❌ Mandrill not configured. Skipping email send.')
      return { success: false, error: 'Email service not configured.' }
    }

    // Validate recipient
    if (!contactData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      console.error('❌ Invalid recipient email:', contactData.email)
      return { success: false, error: 'Invalid recipient email address.' }
    }

    // Construct the message
    const message = {
      from_email: FROM_EMAIL,
      subject: `Thank you for contacting MilletGlow, ${contactData.name}!`,
      text: `
Hi ${contactData.name},

Thank you for reaching out to MilletGlow! 🌾
We’ve received your message and our team will get back to you shortly.

Here’s a copy of your submission:

👤 Name: ${contactData.name}
📧 Email: ${contactData.email}
📱 Phone: ${contactData.phone || 'Not provided'}
🏢 Organization: ${contactData.organization || 'Not specified'}

💬 Message:
${contactData.message}

Best regards,  
The MilletGlow Team  
https://milletglow.in
      `,
      to: [{ email: contactData.email, type: 'to' }],
    }

    // Send the message via Mandrill
    const response = await mandrill.messages.send({ message })

    if (response[0]?.status === 'rejected') {
      console.error('⚠️ Mandrill rejected message:', response[0]?.reject_reason)
      return { success: false, error: 'Email was rejected by Mandrill.' }
    }

    console.log('✅ Email sent successfully to:', contactData.email)
    return { success: true }
  } catch (error: any) {
    console.error('❌ Failed to send email notification:', error)
    return { success: false, error: 'Failed to send email notification.' }
  }
}
