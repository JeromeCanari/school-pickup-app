# 🚌 School Pickup Notification App - Setup Guide

This app sends automated emails to your kids' school when they won't be taking the bus.

## 📋 What You'll Need

1. A GitHub account (free)
2. A Vercel account (free)
3. An EmailJS account (free)
4. 15-20 minutes

---

## 🚀 Step 1: Setup EmailJS (5 minutes)

EmailJS will send emails from your Gmail account.

### 1.1 Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **Sign Up** (top right)
3. Use your Google account to sign up (easier!)
4. Verify your email if needed

### 1.2 Connect Your Gmail

1. In EmailJS dashboard, click **Email Services** (left sidebar)
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and sign in with **jerome.coppens@gmail.com**
5. Allow EmailJS to send emails on your behalf
6. Give it a name like "Jerome Gmail" 
7. Click **Create Service**
8. **IMPORTANT:** Copy the **Service ID** (looks like `service_xxxxxxx`) - you'll need this!

### 1.3 Create Email Template

1. Click **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Replace the default template with this:

**Subject:**
```
{{subject}}
```

**Content:**
```
{{message}}
```

**To Email:**
```
{{to_email}}
```

**Cc:**
```
{{cc_email}}
```

4. Click **Save**
5. **IMPORTANT:** Copy the **Template ID** (looks like `template_xxxxxxx`)

### 1.4 Get Your Public Key

1. Click **Account** (left sidebar)
2. Find **Public Key** (looks like a long string of letters/numbers)
3. **IMPORTANT:** Copy this - you'll need it!

---

## 🐙 Step 2: Upload to GitHub (5 minutes)

### 2.1 Create GitHub Account
1. Go to https://github.com
2. Sign up if you don't have an account (it's free!)

### 2.2 Create New Repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `school-pickup-app`
3. Set to **Public**
4. **DO NOT** check "Add README"
5. Click **Create repository**

### 2.3 Upload Your Code
1. On the next page, scroll down to **"…or create a new repository on the command line"**
2. Open Terminal on your Mac
3. Navigate to where you downloaded the app files:
```bash
cd ~/Downloads/school-pickup-app
```

4. Run these commands one by one (you can copy-paste each line):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/school-pickup-app.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## ⚡ Step 3: Deploy to Vercel (5 minutes)

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Click **Sign Up**
3. Choose **Continue with GitHub** (easiest!)
4. Authorize Vercel to access your GitHub

### 3.2 Import Your Project
1. Click **Add New...** → **Project**
2. Find `school-pickup-app` in your repositories
3. Click **Import**

### 3.3 Add Environment Variables
Before deploying, you need to add your EmailJS credentials:

1. Expand **Environment Variables** section
2. Add these three variables:

| Name | Value |
|------|-------|
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Paste your Public Key from Step 1.4 |
| `REACT_APP_EMAILJS_SERVICE_ID` | Paste your Service ID from Step 1.2 |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Paste your Template ID from Step 1.3 |

3. Click **Deploy**

### 3.4 Wait for Deployment
- Vercel will build your app (takes 1-2 minutes)
- When done, you'll see a preview with confetti! 🎉
- Click **Visit** to see your live app

---

## 🔧 Step 4: Update the Code with Your Keys (2 minutes)

Now we need to update the app to use your EmailJS credentials.

### 4.1 Edit the Code in GitHub
1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/school-pickup-app`
2. Navigate to `src/App.jsx`
3. Click the pencil icon (Edit this file)

### 4.2 Replace the Placeholder Values

Find these three lines near the top of the file:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

Replace with:
```javascript
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY");
```

Then find:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
```

Replace with:
```javascript
await emailjs.send(
  process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
```

**As a backup**, also replace the literal strings `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, and `YOUR_TEMPLATE_ID` with your actual values from Step 1.

### 4.3 Commit the Changes
1. Scroll down
2. Click **Commit changes**
3. Click **Commit changes** again in the popup

Vercel will automatically redeploy your app with the new code (takes 1-2 minutes).

---

## ✅ Step 5: Test It!

1. Go to your Vercel app URL (something like `school-pickup-app-xxx.vercel.app`)
2. Select Elea and/or Malo
3. Pick a date
4. Verify the email preview looks correct
5. Click **Envoyer l'email**
6. Check your inbox - you should receive a copy!

---

## 📱 Bonus: Add to Home Screen (iPhone)

To make this feel like a real app:

1. Open your app in Safari on your iPhone
2. Tap the **Share** button
3. Scroll down and tap **Add to Home Screen**
4. Name it "🚌 École Pickup"
5. Tap **Add**

Now you have a one-tap icon to send these emails!

---

## 🎯 Your App URL

After deployment, bookmark this URL: `https://school-pickup-app-[YOUR-VERCEL-ID].vercel.app`

You can also set up a custom domain in Vercel settings if you want!

---

## 🆘 Troubleshooting

### Email not sending?
- Check that your EmailJS Service ID, Template ID, and Public Key are correct
- Make sure you're connected to the internet
- Check your Gmail spam folder
- Verify your Gmail account is connected in EmailJS dashboard

### App not loading?
- Clear your browser cache
- Try in incognito/private mode
- Check Vercel dashboard for deployment errors

### Need to change recipient emails?
1. Edit `src/App.jsx` in GitHub
2. Find the email addresses in the recipients section
3. Update them
4. Commit changes - Vercel auto-deploys!

---

## 🎉 You're Done!

Your app is now live and ready to use. Just open it on your phone whenever you need to notify the school!

**Questions?** Feel free to ask me anything!
