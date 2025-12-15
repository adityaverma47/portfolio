# Express.js Backend Setup Guide

## 🎯 Overview
Your portfolio now uses an **Express.js backend server** for handling contact form submissions and sending emails. This gives you more control and flexibility compared to serverless functions.

---

## 📁 Project Structure

```
Portfolio2/
└── portfolio/
    ├── backend/                    # Express.js backend
    │   ├── server.js              # Main server file
    │   ├── package.json           # Backend dependencies
    │   ├── .env.example           # Environment template
    │   └── email-templates/
    │       ├── admin-notification.js
    │       └── user-confirmation.js
    └── src/                       # Frontend (Vite/React)
        └── components/
            └── ContactSection.tsx  # Updated to call Express API
```

---

## 🚀 Quick Start

### 1. Set Up Backend

```bash
# Navigate to backend folder
cd c:\Users\adity\Desktop\Portfolio2\portfolio\backend

# Create .env file
copy .env.example .env

# Edit .env and add your Resend API key
# (Get it from https://resend.com/api-keys)
```

**Edit `backend/.env`:**
```env
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=adityaverma4769@gmail.com
FROM_EMAIL=onboarding@resend.dev
FRONTEND_URL=http://localhost:5173
PORT=3001
NODE_ENV=development
```

### 2. Start Backend Server

```bash
# In backend folder
npm start

# Or for development with auto-reload:
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📧 Email service: Configured
📬 Admin email: adityaverma4769@gmail.com
🌐 CORS enabled for: http://localhost:5173
```

### 3. Set Up Frontend

```bash
# Navigate to portfolio root
cd c:\Users\adity\Desktop\Portfolio2\portfolio

# Create .env file (if not exists)
copy .env.example .env
```

**Edit `portfolio/.env`:**
```env
VITE_API_URL=http://localhost:3001
```

### 4. Start Frontend

```bash
# In portfolio root
npm run dev
```

### 5. Test the Contact Form

1. Open `http://localhost:5173` in your browser
2. Scroll to the contact section
3. Fill out and submit the form
4. Check:
   - ✅ Success message appears
   - ✅ You receive email at `adityaverma4769@gmail.com`
   - ✅ Sender receives confirmation email

---

## 🔧 Backend Features

### Rate Limiting
- **5 requests per 15 minutes** per IP address
- Prevents spam and abuse
- Returns 429 error if limit exceeded

### CORS Protection
- Only allows requests from your frontend URL
- Configurable via `FRONTEND_URL` environment variable

### Input Validation
- Email format validation
- Required field checking
- Input sanitization (max lengths)

### Error Handling
- Graceful error responses
- Detailed logging for debugging
- User-friendly error messages

---

## 🌐 Deploying to Production

### Option 1: Railway (Recommended - Free Tier Available)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Set root directory to `/portfolio/backend`
6. Add environment variables:
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `FROM_EMAIL`
   - `FRONTEND_URL` (your deployed portfolio URL)
   - `NODE_ENV=production`
7. Deploy!

Railway will give you a URL like: `https://your-app.railway.app`

### Option 2: Render

1. Go to [render.com](https://render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `portfolio/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (same as Railway)
6. Deploy!

### Option 3: Vercel (Serverless)

```bash
# In backend folder
npm install -g vercel
vercel
```

Follow prompts and add environment variables in Vercel dashboard.

---

## 🔄 Update Frontend for Production

After deploying backend, update your frontend `.env`:

```env
# Production
VITE_API_URL=https://your-backend-url.railway.app
```

Then rebuild and deploy your frontend:
```bash
npm run build
# Deploy to Netlify, Vercel, etc.
```

---

## 📧 Email Configuration

### Using Resend (Current Setup)

1. Sign up at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Add to backend `.env` file

**Free Tier:**
- 100 emails/day
- 3,000 emails/month
- Perfect for portfolio!

### Using Your Own Domain

1. Add domain in Resend dashboard
2. Verify DNS records
3. Update `FROM_EMAIL` in `.env`:
   ```env
   FROM_EMAIL=noreply@yourdomain.com
   ```

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Verify `.env` file exists in `backend/` folder
- Check `RESEND_API_KEY` is set correctly

### CORS errors in browser
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check backend server is running
- Clear browser cache

### Emails not sending
- Check Resend API key is valid
- Verify you're under free tier limits (100/day)
- Check backend console for error messages
- Look in spam folder

### "Failed to send message" error
- Open browser console (F12) for detailed error
- Check backend server logs
- Verify backend is running and accessible

---

## 📊 Monitoring

### Check Server Health

```bash
curl http://localhost:3001/health
```

Should return:
```json
{"status":"ok","message":"Server is running"}
```

### View Logs

Backend logs show:
- Incoming requests
- Email sending status
- Errors and warnings

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use environment variables** - Never hardcode API keys
3. **Enable rate limiting** - Already configured (5 req/15min)
4. **Validate all inputs** - Already implemented
5. **Use HTTPS in production** - Railway/Render provide this automatically

---

## 📝 API Endpoints

### POST `/api/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to work with you!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Emails sent successfully",
  "emailIds": {
    "admin": "abc123",
    "user": "def456"
  }
}
```

**Error Response (400/500):**
```json
{
  "error": "Missing required fields",
  "details": "Name, email, and message are required"
}
```

### GET `/health`

Health check endpoint - returns server status.

---

## ✅ Checklist

**Backend Setup:**
- [ ] Created `.env` file in `backend/` folder
- [ ] Added Resend API key
- [ ] Started backend server (`npm start`)
- [ ] Verified server is running (check console)

**Frontend Setup:**
- [ ] Created `.env` file in portfolio root
- [ ] Set `VITE_API_URL=http://localhost:3001`
- [ ] Started frontend (`npm run dev`)

**Testing:**
- [ ] Submitted test message through contact form
- [ ] Received admin notification email
- [ ] Sender received confirmation email
- [ ] Checked both emails display correctly

**Production (when ready):**
- [ ] Deployed backend to Railway/Render
- [ ] Added environment variables in hosting dashboard
- [ ] Updated frontend `VITE_API_URL` to production URL
- [ ] Tested on live site

---

## 💡 Tips

1. **Development**: Run both frontend and backend simultaneously in separate terminals
2. **Testing**: Use your own email to test the confirmation email
3. **Debugging**: Check both frontend console (F12) and backend terminal for errors
4. **Production**: Use a custom domain for professional "from" email addresses

---

**Need Help?** Check the backend console logs for detailed error messages!
