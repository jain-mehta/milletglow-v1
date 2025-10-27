# 📧 MailChimp Mandrill Setup Guide

Complete guide to set up MailChimp Mandrill (Transactional Email) integration for your MilletGlow website.

## 🎯 Overview

This implementation provides **dual email functionality**:
- **User Confirmation**: Beautiful welcome/confirmation emails sent to form submitters
- **Admin Notifications**: Instant alerts to admin when forms are submitted
- **Professional Templates**: Branded HTML emails with responsive design
- **Error Handling**: Graceful fallbacks and detailed logging

## 📋 Prerequisites

Before starting, ensure you have:
- MailChimp account (free tier available)
- Domain ownership verification
- Access to your website's environment variables

---

## 🚀 Step 1: Create MailChimp Account

### 1.1 Sign Up for MailChimp
1. Go to [mailchimp.com](https://mailchimp.com)
2. Click **"Sign Up Free"**
3. Fill in your details:
   - Email address
   - Username
   - Password
   - Business name: `MilletGlow`
   - Website: `https://milletglow.in`

### 1.2 Verify Your Account
1. Check your email for verification link
2. Click verification link
3. Complete your profile setup

---

## 📮 Step 2: Set Up Mandrill (Transactional Email)

### 2.1 Enable Mandrill Add-on
1. In MailChimp dashboard, go to **Integrations**
2. Search for **"Mandrill"**
3. Click **"Add"** to enable Mandrill
4. Follow the setup wizard

**Note**: Mandrill is a paid add-on. Pricing starts at $20/month for 25,000 emails.

### 2.2 Alternative: Use Transactional Email
If Mandrill is not available, use MailChimp's built-in transactional email:
1. Go to **Automations** → **Transactional**
2. Click **"Create Transactional Email"**
3. Set up your transactional email templates

---

## 🔑 Step 3: Get API Keys

### 3.1 MailChimp API Key
1. In MailChimp dashboard, click your profile icon
2. Go to **Account** → **API keys**
3. Click **"Create A Key"**
4. Copy the API key (starts with a long string)
5. Store securely - this is your `MAILCHIMP_API_KEY`

### 3.2 Mandrill API Key (if using Mandrill)
1. In Mandrill dashboard, go to **Settings**
2. Click **"SMTP & API Info"**
3. Under **"API Keys"**, click **"New API Key"**
4. Copy the API key
5. Store securely - this is your `MAILCHIMP_API_KEY` for transactional emails

### 3.3 Get Audience ID
1. In MailChimp, go to **Audience**
2. Click **"Manage Audience"** → **"Settings"**
3. Click **"Audience name and defaults"**
4. Copy the **Audience ID** (alphanumeric string)
5. Store as `MAILCHIMP_AUDIENCE_ID`

### 3.4 Get Server Prefix
1. Look at your MailChimp dashboard URL
2. Note the server prefix (e.g., `us1`, `us2`, `eu1`)
3. Example: if URL is `https://us1.admin.mailchimp.com/`, prefix is `us1`
4. Store as `MAILCHIMP_SERVER_PREFIX`

---

## ⚙️ Step 4: Configure Environment Variables

### 4.1 Add to .env.local
Add these variables to your `.env.local` file:

```bash
# MailChimp Configuration
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_AUDIENCE_ID=your_audience_id_here
MAILCHIMP_SERVER_PREFIX=us1

# Email Configuration
FROM_EMAIL=info@milletglow.in
ADMIN_EMAIL=harsh@milletglow.in

# reCAPTCHA (if not already configured)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### 4.2 Production Environment Variables
For production deployment, add the same variables to your hosting platform:

**Vercel:**
1. Go to project settings
2. Navigate to **Environment Variables**
3. Add each variable individually

**Netlify:**
1. Go to site settings
2. Navigate to **Environment variables**
3. Add each variable

**Other platforms:**
Follow your platform's documentation for environment variable setup.

---

## 📧 Step 5: Verify Email Setup

### 5.1 Domain Verification
1. In MailChimp, go to **Account** → **Settings**
2. Click **"Domains"**
3. Click **"Verify Domain"**
4. Add your domain: `milletglow.in`
5. Follow DNS verification steps

### 5.2 Email Authentication
Add these DNS records to improve deliverability:

**SPF Record:**
```
TXT @ "v=spf1 include:servers.mcsv.net ?all"
```

**DKIM Record:**
```
TXT k1._domainkey "v=DKIM1; k=rsa; p=YOUR_DKIM_KEY"
```

**DMARC Record:**
```
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@milletglow.in"
```

---

## 🧪 Step 6: Test Email Functionality

### 6.1 Test Contact Form
1. Go to your website's contact page
2. Fill out the form with a test email
3. Submit the form
4. Check for:
   - ✅ Form submission success message
   - ✅ Confirmation email in test inbox
   - ✅ Admin notification in admin inbox

### 6.2 Test Newsletter Subscription
1. Go to your website's newsletter signup
2. Enter a test email address
3. Submit the form
4. Check for:
   - ✅ Subscription success message
   - ✅ Welcome email in test inbox
   - ✅ Admin notification (if enabled)

### 6.3 Check Email Quality
Verify emails are:
- ✅ Properly formatted (HTML + text versions)
- ✅ Mobile responsive
- ✅ Include all dynamic content
- ✅ Have working links
- ✅ Display correctly across email clients

---

## 🔧 Step 7: Troubleshooting

### 7.1 Common Issues & Solutions

**❌ "Email service not configured"**
- Check `MAILCHIMP_API_KEY` is set correctly
- Verify API key is active in MailChimp dashboard
- Ensure no extra spaces in environment variables

**❌ "Invalid email address"**
- Verify email format validation
- Check for typos in email addresses
- Ensure email field is properly filled

**❌ "Mandrill rejected message"**
- Check API key permissions
- Verify sender email is authorized
- Check Mandrill account status and credits

**❌ Emails not being received**
- Check spam folders
- Verify domain authentication
- Check MailChimp reputation dashboard
- Verify recipient email is valid

### 7.2 Debug Mode
Enable detailed logging by checking console output:

```bash
# Check server logs
npm run dev

# Look for these log messages:
✅ Mandrill client initialized successfully
📧 Email Results: confirmation: ✅ Sent, notification: ✅ Sent
✅ Contact confirmation email sent to: user@example.com
✅ Contact admin notification sent to: admin@milletglow.in
```

### 7.3 Test Email Templates
To test email appearance:

1. Use [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com)
2. Send test emails to different providers:
   - Gmail
   - Outlook
   - Yahoo
   - Apple Mail

---

## 📊 Step 8: Monitor Email Performance

### 8.1 MailChimp Analytics
1. Go to **Campaigns** → **Email**
2. View delivery rates, open rates, click rates
3. Check bounce and complaint rates

### 8.2 Mandrill Analytics (if using)
1. Go to Mandrill dashboard
2. Check **Outbound Activity**
3. Monitor delivery status and bounces

### 8.3 Set Up Alerts
Configure alerts for:
- High bounce rates (>5%)
- Low delivery rates (<95%)
- API key usage limits
- Account suspension warnings

---

## 🛡️ Step 9: Security Best Practices

### 9.1 API Key Security
- ✅ Never commit API keys to version control
- ✅ Use environment variables only
- ✅ Rotate API keys monthly
- ✅ Monitor API key usage
- ✅ Restrict API key permissions

### 9.2 Email Content Security
- ✅ Sanitize all user inputs
- ✅ Validate email addresses
- ✅ Use reCAPTCHA protection
- ✅ Rate limit form submissions
- ✅ Monitor for spam content

### 9.3 Compliance
- ✅ Include unsubscribe links
- ✅ Add physical address
- ✅ Follow CAN-SPAM Act
- ✅ GDPR compliance for EU users
- ✅ Clear privacy policy

---

## 📈 Step 10: Optimization & Scaling

### 10.1 Email Templates
Regularly update templates for:
- Seasonal campaigns
- Product launches
- Promotional offers
- Brand updates

### 10.2 A/B Testing
Test different:
- Subject lines
- Email content
- Call-to-action buttons
- Send times

### 10.3 Automation
Set up automated workflows:
- Welcome series for new subscribers
- Abandoned cart reminders
- Product recommendations
- Re-engagement campaigns

---

## 📞 Support & Resources

### Official Documentation
- [MailChimp API Docs](https://mailchimp.com/developer/)
- [Mandrill API Docs](https://mailchimp.com/developer/transactional/)
- [MailChimp Transactional](https://mailchimp.com/features/transactional-email/)

### Community Support
- [MailChimp Community](https://mailchimp.com/help/)
- [Stack Overflow - MailChimp](https://stackoverflow.com/questions/tagged/mailchimp)

### Technical Support
- MailChimp Support: [mailchimp.com/help/contact/](https://mailchimp.com/help/contact/)
- Priority support available with paid plans

---

## ✅ Implementation Checklist

**Initial Setup:**
- [ ] MailChimp account created
- [ ] Mandrill enabled (or transactional email configured)
- [ ] API keys obtained
- [ ] Environment variables configured
- [ ] Domain verified

**Email Configuration:**
- [ ] DNS records added (SPF, DKIM, DMARC)
- [ ] From email authorized
- [ ] Templates tested across email clients
- [ ] Mobile responsiveness verified

**Functionality Testing:**
- [ ] Contact form sends confirmation email
- [ ] Contact form sends admin notification
- [ ] Newsletter sends welcome email
- [ ] Newsletter sends admin notification
- [ ] Error handling works correctly

**Security & Compliance:**
- [ ] reCAPTCHA implemented
- [ ] Input validation active
- [ ] Rate limiting configured
- [ ] Unsubscribe links included
- [ ] Privacy policy updated

**Monitoring & Analytics:**
- [ ] Email delivery tracking
- [ ] Open rate monitoring
- [ ] Bounce rate alerts
- [ ] Performance dashboards

---

## 🎉 Conclusion

Your MailChimp Mandrill integration is now complete! This setup provides:

✅ **Professional Email Communication**
- Branded confirmation emails
- Instant admin notifications
- Mobile-responsive templates

✅ **Reliable Delivery**
- High deliverability rates
- Domain authentication
- Spam protection

✅ **Scalable Solution**
- Handles high volume
- Detailed analytics
- Easy maintenance

✅ **Security & Compliance**
- GDPR compliant
- Anti-spam protection
- Secure API handling

**Next Steps:**
1. Monitor email performance for the first week
2. Adjust templates based on user feedback
3. Set up automated email campaigns
4. Consider A/B testing for optimization

**Need Help?**
Contact: harsh@milletglow.in for technical support.

---

*Last Updated: ${new Date().toLocaleDateString()}*
*Version: 1.0*