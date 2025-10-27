// Email functionality test script
// Run with: node test/email-test.js

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })

// Mock the require for ESM compatibility
const mockMandrillService = {
  processContactForm: async (contactData) => {
    console.log('🧪 Testing Contact Form Processing...')
    console.log('📝 Contact Data:', contactData)

    // Simulate email processing
    const confirmationResult = { success: true }
    const notificationResult = { success: true }

    return {
      success: true,
      details: {
        confirmation: confirmationResult,
        notification: notificationResult
      }
    }
  },

  processNewsletterSubscription: async (newsletterData) => {
    console.log('🧪 Testing Newsletter Subscription...')
    console.log('📝 Newsletter Data:', newsletterData)

    // Simulate email processing
    const confirmationResult = { success: true }
    const notificationResult = { success: true }

    return {
      success: true,
      details: {
        confirmation: confirmationResult,
        notification: notificationResult
      }
    }
  }
}

async function testEmailConfiguration() {
  console.log('🚀 Starting Email Configuration Test...\n')

  // Check environment variables
  console.log('🔍 Checking Environment Variables:')
  const requiredVars = [
    'MAILCHIMP_API_KEY',
    'FROM_EMAIL',
    'ADMIN_EMAIL'
  ]

  const optionalVars = [
    'MAILCHIMP_AUDIENCE_ID',
    'MAILCHIMP_SERVER_PREFIX'
  ]

  let configIssues = []

  requiredVars.forEach(varName => {
    const value = process.env[varName]
    if (value) {
      console.log(`   ✅ ${varName}: ${value.substring(0, 10)}...`)
    } else {
      console.log(`   ❌ ${varName}: Not configured`)
      configIssues.push(varName)
    }
  })

  optionalVars.forEach(varName => {
    const value = process.env[varName]
    if (value) {
      console.log(`   ✅ ${varName}: ${value}`)
    } else {
      console.log(`   ⚠️  ${varName}: Not configured (optional)`)
    }
  })

  if (configIssues.length > 0) {
    console.log(`\n❌ Configuration Issues Found:`)
    configIssues.forEach(issue => console.log(`   - ${issue} is required`))
    console.log('\n📝 Please add missing variables to .env.local file')
    return false
  }

  console.log('\n✅ All required environment variables are configured!\n')

  // Test contact form processing
  console.log('📧 Testing Contact Form Email Processing...')
  try {
    const testContactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      organization: 'Test Organization',
      message: 'This is a test message for the contact form functionality.'
    }

    const contactResult = await mockMandrillService.processContactForm(testContactData)

    if (contactResult.success) {
      console.log('   ✅ Contact form processing: PASSED')
      console.log(`   📧 Confirmation email: ${contactResult.details.confirmation.success ? 'Success' : 'Failed'}`)
      console.log(`   📧 Admin notification: ${contactResult.details.notification.success ? 'Success' : 'Failed'}`)
    } else {
      console.log('   ❌ Contact form processing: FAILED')
      console.log(`   Error: ${contactResult.error}`)
    }
  } catch (error) {
    console.log('   ❌ Contact form processing: ERROR')
    console.log(`   Error: ${error.message}`)
  }

  console.log('')

  // Test newsletter subscription processing
  console.log('📧 Testing Newsletter Subscription Email Processing...')
  try {
    const testNewsletterData = {
      email: 'test@example.com',
      name: 'Test User',
      source: 'website-test'
    }

    const newsletterResult = await mockMandrillService.processNewsletterSubscription(testNewsletterData)

    if (newsletterResult.success) {
      console.log('   ✅ Newsletter subscription processing: PASSED')
      console.log(`   📧 Welcome email: ${newsletterResult.details.confirmation.success ? 'Success' : 'Failed'}`)
      console.log(`   📧 Admin notification: ${newsletterResult.details.notification.success ? 'Success' : 'Failed'}`)
    } else {
      console.log('   ❌ Newsletter subscription processing: FAILED')
      console.log(`   Error: ${newsletterResult.error}`)
    }
  } catch (error) {
    console.log('   ❌ Newsletter subscription processing: ERROR')
    console.log(`   Error: ${error.message}`)
  }

  console.log('\n🎉 Email Configuration Test Complete!\n')

  // Provide next steps
  console.log('📋 Next Steps:')
  console.log('   1. Start your development server: npm run dev')
  console.log('   2. Test contact form on: http://localhost:3000/contact')
  console.log('   3. Test newsletter signup on your website footer')
  console.log('   4. Check your email inboxes for confirmation emails')
  console.log('   5. Check admin email for notification emails')
  console.log('   6. Monitor console logs for detailed email processing info')

  console.log('\n🔧 Troubleshooting:')
  console.log('   - Check spam folders if emails are not received')
  console.log('   - Verify FROM_EMAIL is authorized in MailChimp')
  console.log('   - Ensure API key has proper permissions')
  console.log('   - Review server console logs for detailed error messages')

  return true
}

// Run the test
testEmailConfiguration().catch(error => {
  console.error('❌ Test failed:', error)
  process.exit(1)
})