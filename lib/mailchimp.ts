export interface MailchimpSubscriber {
  email: string
  name?: string
  source?: string
}

export async function subscribeToNewsletter(subscriber: MailchimpSubscriber) {
  try {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriber),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Subscription failed')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Subscription failed'
    }
  }
}

export async function sendContactMessage(messageData: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  recaptchaToken: string
}) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    }
  }
}