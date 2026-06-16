# Together Finance - Waitlist Landing Page

A premium, modern waitlist landing page for "Together Finance" – a shared finance platform for couples and families.

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express.js + TypeScript
- **Database:** MySQL

## Project Structure

```
together-finance/
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/      # UI and section components
│   │   ├── pages/           # Landing and Admin pages
│   │   ├── animations/      # Framer Motion variants
│   │   ├── styles/          # Global CSS / Tailwind
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # API client helpers
│   └── ...
├── backend/                 # Express API
│   ├── src/
│   │   ├── config/          # DB connection & migration
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/       # Validation & auth
│   │   ├── models/          # DB query functions
│   │   ├── routes/          # Express routers
│   │   └── server.ts        # App entry point
│   └── ...
└── database/
    └── schema.sql           # MySQL schema
```

## Getting Started

### 1. Clone & Install

```bash
# Backend
cd backend
cp .env.example .env   # edit with your MySQL credentials
npm install

# Frontend
cd ../frontend
cp .env.example .env
npm install
```

### 2. Database Setup

```bash
# Create the database and tables
mysql -u root -p < database/schema.sql

# Or run the migration script
cd backend && npm run migrate
```

### 3. Environment Variables

**backend/.env**
```
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=together_finance
JWT_SECRET=your_random_secret_here
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:4000/api
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Open http://localhost:5173

### 5. Admin Dashboard

Navigate to http://localhost:5173/admin

Login credentials are set in `database/schema.sql`. The default admin user is created when you run the schema. You can generate a proper password hash using:

```bash
node -e "console.log(require('bcrypt').hashSync('your_password', 12))"
```

Then update the `password_hash` in the `admin_users` table.

## API Endpoints

| Method | Endpoint                  | Description              | Auth Required |
|--------|--------------------------|--------------------------|--------------|
| POST   | /api/waitlist            | Join the waitlist        | No           |
| GET    | /api/waitlist/stats      | Get waitlist stats       | No           |
| POST   | /api/analytics/visit     | Track page visit         | No           |
| POST   | /api/admin/login         | Admin login              | No           |
| GET    | /api/admin/submissions   | List submissions         | Yes (JWT)    |
| GET    | /api/admin/export        | Export CSV               | Yes (JWT)    |
| GET    | /api/health              | Health check             | No           |

## Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build   # outputs to dist/
```

Set `VITE_API_URL` to your production API URL.

### Backend (Railway / Render / Fly.io)

```bash
cd backend
npm run build   # outputs to dist/
npm start
```

### Database (PlanetScale / AWS RDS)

Run `database/schema.sql` against your production MySQL instance.

## Features

- Premium fintech landing page design
- Apple-inspired UI with glassmorphism
- Framer Motion animations throughout
- Fully responsive mobile-first layout
- Waitlist form with validation
- Admin dashboard with search & filters
- CSV export
- Page visit analytics
- SEO metadata, OG tags, Twitter cards, structured data

## Lighthouse Performance

The build is optimized for 90+ Lighthouse scores:
- Code splitting via Vite
- Lazy-loaded framer-motion
- Optimized Tailwind CSS output
- Preconnected Google Fonts
- Semantic HTML structure
