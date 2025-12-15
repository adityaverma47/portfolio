# 🚀 Express.js Backend - Quick Reference

## Start Backend Server

```bash
cd c:\Users\adity\Desktop\Portfolio2\portfolio\backend
npm start
```

Server runs on: `http://localhost:3001`

---

## Start Frontend

```bash
cd c:\Users\adity\Desktop\Portfolio2\portfolio
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Environment Files Needed

### Backend: `backend/.env`
```env
RESEND_API_KEY=re_your_key_here
ADMIN_EMAIL=adityaverma4769@gmail.com
FROM_EMAIL=onboarding@resend.dev
FRONTEND_URL=http://localhost:5173
PORT=3001
```

### Frontend: `.env`
```env
VITE_API_URL=http://localhost:3001
```

---

## API Endpoint

**POST** `http://localhost:3001/api/contact`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

---

## Features

✅ CORS protection  
✅ Rate limiting (5 req/15min)  
✅ Input validation  
✅ Email to admin + user  
✅ UIWizard branding  

---

## Deploy Backend

**Railway** (Recommended):
1. Go to railway.app
2. Deploy from GitHub
3. Set root: `/portfolio/backend`
4. Add env variables
5. Deploy!

**Then update frontend `.env`:**
```env
VITE_API_URL=https://your-app.railway.app
```

---

📖 **Full Guide:** [EXPRESS_SETUP.md](file:///c:/Users/adity/Desktop/Portfolio2/portfolio/EXPRESS_SETUP.md)
