# 🚌 School Pickup Notification App

A simple web app to notify École L'Anse-au-sable when Elea and Malo won't be taking the bus.

## Features

- ✅ Select which kids won't take the bus
- 📅 Choose pickup date
- 👥 Auto-select relevant teachers based on kids
- 📧 Send formatted email in French
- 📱 Mobile-friendly design
- 🎨 Beautiful, clean interface

## Email Recipients

- **École**: ecole_anse_au_sable@csf.bc.ca
- **Éloise Lescaut**: eloise_lescaut@csf.bc.ca (Elea's teacher, 3/4e année)
- **Valérie Desnoyers**: valerie_desnoyers@csf.bc.ca (Malo's teacher, 1ère année)  
- **Adèle Anctil**: adele_anctil@csf.bc.ca (Admin)
- **CC**: jerome.coppens@gmail.com, stephanie.lesieur@gmail.com

## Quick Start

See [QUICK_START.md](QUICK_START.md) for 15-minute deployment guide.

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed step-by-step instructions.

## Tech Stack

- React 18
- EmailJS for email sending
- Vercel for hosting
- Pure CSS (no frameworks)

## Local Development

```bash
npm install
npm start
```

App runs on http://localhost:3000

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - REACT_APP_EMAILJS_PUBLIC_KEY
   - REACT_APP_EMAILJS_SERVICE_ID
   - REACT_APP_EMAILJS_TEMPLATE_ID
4. Deploy!

## License

Personal use for Jerome & Stephanie Coppens-Lesieur family.
