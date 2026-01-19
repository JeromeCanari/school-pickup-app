# ⚡ Quick Start Guide - 15 Minutes to Deploy

## Part 1: EmailJS Setup (5 min)

1. **Sign up at https://www.emailjs.com** with your Google account
2. **Add Gmail Service**: 
   - Email Services → Add New Service → Gmail
   - Connect jerome.coppens@gmail.com
   - Copy the **Service ID** (e.g., service_abc123)
3. **Create Template**:
   - Email Templates → Create New Template
   - Subject: `{{subject}}`
   - Content: `{{message}}`
   - To: `{{to_email}}`
   - Cc: `{{cc_email}}`
   - Copy the **Template ID** (e.g., template_xyz789)
4. **Get Public Key**: Account tab → Copy your Public Key

📝 **Save these 3 values - you'll need them!**

---

## Part 2: GitHub (3 min)

1. Sign up at https://github.com if needed
2. Create new repository called `school-pickup-app` (Public)
3. Download the app files I created
4. In Terminal:
```bash
cd path/to/school-pickup-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/school-pickup-app.git
git push -u origin main
```

---

## Part 3: Vercel Deploy (5 min)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import `school-pickup-app` project
4. **BEFORE clicking Deploy**, add Environment Variables:
   - `REACT_APP_EMAILJS_PUBLIC_KEY` = your Public Key
   - `REACT_APP_EMAILJS_SERVICE_ID` = your Service ID  
   - `REACT_APP_EMAILJS_TEMPLATE_ID` = your Template ID
5. Click **Deploy** and wait 2 minutes
6. Click the URL to open your live app!

---

## Part 4: Update Code (2 min)

1. In GitHub, edit `src/App.jsx`
2. Replace line 6:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```
with your actual Public Key:
```javascript
emailjs.init("paste_your_public_key_here");
```

3. Replace lines 107-108:
```javascript
'YOUR_SERVICE_ID',
'YOUR_TEMPLATE_ID',
```
with your actual IDs:
```javascript
'service_abc123',
'template_xyz789',
```

4. Commit changes → Vercel auto-redeploys in 1 minute

---

## ✅ Test It!

Open your Vercel URL, select kids, pick date, send email!

## 📱 iPhone Tip

In Safari: Share button → Add to Home Screen → "🚌 École"

---

**That's it! Bookmark your Vercel URL and you're ready to go!**
