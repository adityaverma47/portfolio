# Contact Form Email Setup Guide

## 🎯 Overview
Your portfolio now has a fully functional contact form that sends:
1. **Admin notification** to `adityaverma4769@gmail.com` with contact details
2. **User confirmation** email promising a 24-hour response

Both emails feature UIWizard branding with your orange color theme (#ff4500).

---

## 📋 Setup Steps

### Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Portfolio Contact Form")
5. Copy the API key (starts with `re_...`)

### Step 3: Configure Environment Variables

#### For Local Development:

1. Create a `.env` file in your portfolio root directory:
   ```bash
   # In: c:\Users\adity\Desktop\Portfolio2\portfolio\.env
   ```

2. Add the following content (replace with your actual API key):
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ADMIN_EMAIL=adityaverma4769@gmail.com
   FROM_EMAIL=onboarding@resend.dev
   ```

3. **Important:** Make sure `.env` is in your `.gitignore` file (it should be by default)

#### For Netlify Production:

1. Go to your Netlify dashboard
2. Select your portfolio site
3. Go to **Site settings** → **Environment variables**
4. Add these three variables:
   - `RESEND_API_KEY` = your API key
   - `ADMIN_EMAIL` = `adityaverma4769@gmail.com`
   - `FROM_EMAIL` = `onboarding@resend.dev` (or your verified domain)

---

## 🧪 Testing Locally

### Install Netlify CLI (if not already installed):
```bash
npm install -g netlify-cli
```

### Run with Netlify Dev:
```bash
netlify dev
```

This will:
- Start your Vite dev server
- Enable Netlify Functions locally
- Make the contact form functional at `http://localhost:8888`

### Test the Form:
1. Navigate to `http://localhost:8888`
2. Scroll to the contact section
3. Fill out the form with test data
4. Submit and check:
   - ✅ Success toast appears
   - ✅ You receive an email at `adityaverma4769@gmail.com`
   - ✅ Test email address receives confirmation

---

## 🚀 Deploying to Netlify

### Option 1: Connect GitHub Repository

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **Add new site** → **Import an existing project**
4. Connect your GitHub repository
5. Netlify will auto-detect the build settings from `netlify.toml`
6. Add environment variables (see Step 3 above)
7. Deploy!

### Option 2: Netlify CLI Deploy

```bash
# Build your project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

---

## 📧 Email Templates

### Admin Notification Email
When someone submits the contact form, you'll receive an email with:
- Contact person's name
- Their email address (clickable to reply)
- Their message
- A "Reply" button for quick response
- UIWizard branding with orange theme

### User Confirmation Email
The sender receives:
- Personalized greeting with their name
- Confirmation that you received their message
- Promise to respond within 24 hours
- Link to view your portfolio
- Your signature (Aditya Verma - Web Developer | UIWizard)

---

## 🔧 Customization

### Change Email Templates
Edit these files to customize the email design:
- `netlify/functions/email-templates/admin-notification.ts`
- `netlify/functions/email-templates/user-confirmation.ts`

### Change Response Time
In `user-confirmation.ts`, find this line and modify:
```typescript
I'll get back to you within <strong style="color: #ffffff;">24 hours</strong>
```

### Use Your Own Domain for Emails
1. Add and verify your domain in Resend
2. Update `FROM_EMAIL` to use your domain:
   ```env
   FROM_EMAIL=noreply@yourdomain.com
   ```

---

## ⚠️ Important Notes

1. **Free Tier Limits:** Resend free tier allows 100 emails/day and 3,000 emails/month
2. **From Email:** The default `onboarding@resend.dev` works for testing but shows "via resend.dev" in email clients. For production, use your own verified domain.
3. **Spam Folder:** Initial emails might land in spam. Ask recipients to mark as "Not Spam"
4. **Rate Limiting:** The function doesn't have rate limiting. Consider adding it if you get spam.

---

## 🐛 Troubleshooting

### "Failed to send message" error:
- Check that `RESEND_API_KEY` is set correctly
- Verify the API key is active in Resend dashboard
- Check browser console for detailed error messages

### Emails not arriving:
- Check spam/junk folders
- Verify email addresses are correct
- Check Resend dashboard for delivery logs
- Ensure you're under the free tier limits

### Local testing not working:
- Make sure you're using `netlify dev` not `npm run dev`
- Verify `.env` file exists and has correct values
- Check that port 8888 is not in use

---

## 📁 Files Created

```
portfolio/
├── netlify/
│   └── functions/
│       ├── send-contact-email.ts          # Main serverless function
│       └── email-templates/
│           ├── admin-notification.ts      # Admin email template
│           └── user-confirmation.ts       # User confirmation template
├── netlify.toml                           # Netlify configuration
├── .env.example                           # Environment variables template
└── src/
    └── components/
        └── ContactSection.tsx             # Updated with API integration
```

---

## ✅ Next Steps

1. [ ] Create Resend account
2. [ ] Get API key
3. [ ] Add environment variables locally
4. [ ] Test with `netlify dev`
5. [ ] Deploy to Netlify
6. [ ] Add environment variables in Netlify dashboard
7. [ ] Test on live site
8. [ ] Send yourself a test message!

---

**Need Help?** Check the [Resend Documentation](https://resend.com/docs) or [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
