<<<<<<< HEAD
# MERN Developer Portfolio

A modern, responsive personal portfolio website for a MERN Stack Developer built with React.js and Tailwind CSS.

## Features

- Responsive navbar with section links
- Hero, About, Skills, Projects, Contact, and Footer sections
- Reusable React components
- Tailwind CSS styling with smooth transitions
- Dark mode toggle
- Smooth scrolling
- Simple animations

## Project Structure

```text
src/
  assets/
  components/
  data/
  App.jsx
  index.css
  main.jsx
public/
  index.html
  resume.pdf
```

## Tailwind Setup

Tailwind is already configured in this project with:

- `tailwind.config.js`
- `postcss.config.js`
- Tailwind directives in `src/index.css`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create your mail env file:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your SMTP values. For Gmail, use an App Password in `SMTP_PASS`.

3. Start frontend + backend together:

```bash
npm start
```

Alternative (two terminals):

```bash
npm run start:server
npm run start:client
```

4. Create a production build:

```bash
npm run build
```

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. In Vercel Project Settings -> Environment Variables, add:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `MAIL_TO`
4. Deploy.

Your contact form sends email from the serverless route at `/api/contact` in production.

## Customization

- Replace `[Your Name]` in the hero and footer with your actual name.
- Update the social/profile links in `src/data/portfolioData.js`.
- Replace `public/resume.pdf` with your real resume PDF.
- Swap the demo and GitHub URLs for your live projects.
=======
# My-Portfolio
>>>>>>> f1b9e2c8c866acfda63d8fb8e870f64dac74f7e7
