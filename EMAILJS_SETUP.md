# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions directly to your email (abdulwahabawan82@gmail.com).

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (since you're using Gmail)
4. Connect your Gmail account (abdulwahabawan82@gmail.com)
5. Give your service a name like "Portfolio Contact"
6. Note down the **Service ID** (something like `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Contact from {{from_name}} - {{subject}}

**Content:**
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio website
```

4. Save the template and note down the **Template ID** (something like `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** in your EmailJS dashboard
2. Find your **Public Key** (something like `RoCBaJkmPMpS6Vdpw`)

## Step 5: Update Environment Variables

1. Open your `.env.local` file
2. Replace the placeholder values with your actual EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
```

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Go to the contact section
3. Fill out and submit the form
4. Check your email (abdulwahabawan82@gmail.com) for the message

## Email Template Variables

The contact form sends these variables to your email template:

- `{{from_name}}` - Sender's full name
- `{{from_email}}` - Sender's email address
- `{{subject}}` - Email subject (optional)
- `{{message}}` - The actual message
- `{{to_name}}` - Your name (Abdul Wahab)
- `{{reply_to}}` - Reply-to email address

## Troubleshooting

**Form not sending emails?**
1. Check your browser console for errors
2. Verify all environment variables are set correctly
3. Make sure your EmailJS service is connected and active
4. Check your spam folder

**Getting rate limited?**
- EmailJS free plan allows 200 emails/month
- Consider upgrading for higher limits

**Email not formatted correctly?**
- Check your template variables match the ones being sent
- Test your template in the EmailJS dashboard

## Security Notes

- Your EmailJS public key is safe to expose in the frontend
- EmailJS handles all email sending securely
- No sensitive data is stored in your application

## Support

If you need help:
1. Check [EmailJS Documentation](https://www.emailjs.com/docs/)
2. Contact EmailJS support
3. The contact form will show fallback error messages with your direct email

---

Once set up, users can contact you directly through the portfolio form, and you'll receive emails at abdulwahabawan82@gmail.com! 