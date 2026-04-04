# MERN Developer Portfolio

Project split into separate folders:

- `frontend/` -> React + Vite app
- `backend/` -> Express + Nodemailer API

## Run

1. Install dependencies:

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

2. Configure backend env:

```powershell
Copy-Item backend/.env.example backend/.env
```

3. Start both:

```bash
npm start
```

## Individual Start Commands

```bash
npm run start:frontend
npm run start:backend
```
