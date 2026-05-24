# Smart Offer Slot Booking System

Fullstack hackathon project for creating time-bound business offers and allowing customers to reserve offer slots through a public booking page.

## Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Backend: .NET 8 Web API
- Database: PostgreSQL
- API Docs: Swagger / OpenAPI

## Features

- Admin login
- Business profile management
- Offer CRUD
- Slot CRUD
- Public offer listing and offer details
- Booking flow with confirmation
- Booking management
- Dashboard and analytics
- Demo-safe fallback UI for charts, offers, slots, and bookings

## Project Structure

```text
Willovate_Labs/
|- src/                         # React frontend
|- public/                      # Static assets
|- SmartOfferBooking.API/       # .NET 8 backend
|- .env.example                 # Frontend env sample
|- SmartOfferBooking.API/.env.example
```

## Local Setup

### 1. Clone and install frontend dependencies

```bash
npm install
```

### 2. Configure frontend environment

Create a root `.env` file from `.env.example`.

Example:

```env
VITE_API_BASE_URL=http://localhost:5069/api/v1
VITE_APP_NAME="Smart Offer Slot Booking System"
VITE_ENABLE_LOGS=true
VITE_TOKEN_KEY=smart_offer_token
```

### 3. Configure backend environment

Create `SmartOfferBooking.API/.env` from `SmartOfferBooking.API/.env.example`.

Example:

```env
POSTGRES_CONNECTION_STRING=Host=localhost;Port=5432;Database=smart_offer_booking;Username=postgres;Password=your_password
JWT_KEY=replace_with_a_long_secure_secret_key_at_least_32_characters
JWT_ISSUER=SmartOfferBookingAPI
JWT_AUDIENCE=SmartOfferBookingClients
JWT_EXPIRY_MINUTES=1440
```

### 4. Run the backend

```bash
dotnet run --project SmartOfferBooking.API/SmartOfferBooking.API.csproj
```

Backend default URLs:

- API: `http://localhost:5069`
- Swagger: `http://localhost:5069/swagger`

### 5. Run the frontend

```bash
npm run dev
```

Frontend default URL:

- App: `http://127.0.0.1:5173`

## Demo Credentials

- Email: `admin@willovate.com`
- Password: `Admin@123`

## Demo Data

The project includes seeded and fallback demo content for presentation:

- 12 sample offers
- 2 future slots per offer
- sample bookings
- analytics fallback charts and insights

## Build Commands

Frontend:

```bash
npm run build
```

Backend:

```bash
dotnet build SmartOfferBooking.API/SmartOfferBooking.API.csproj
```

## API Summary

Main routes include:

- `POST /api/v1/auth/login`
- `GET /api/v1/business`
- `POST /api/v1/offers`
- `GET /api/v1/offers`
- `POST /api/v1/slots`
- `GET /api/v1/slots`
- `POST /api/v1/bookings`
- `GET /api/v1/bookings`
- `GET /api/v1/dashboard/summary`

Use Swagger for the complete API contract.

## GitHub Publish Checklist

Before pushing publicly:

- Make sure real secrets are only in local `.env` files
- Keep only `.env.example` files in Git
- Verify database credentials and JWT keys are not committed
- Add screenshots, Swagger screenshot, ER diagram, and demo video links if needed for submission

## Push To GitHub

### 1. Initialize git

```bash
git init
git add .
git commit -m "Initial hackathon submission"
```

### 2. Create a GitHub repository

Create a new empty repository on GitHub, then copy its URL.

### 3. Connect local repo to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Important Note About `.env` Files

If `.env` or `SmartOfferBooking.API/.env` were already tracked before updating `.gitignore`, Git will still try to push them.

Remove them from git tracking with:

```bash
git rm --cached .env
git rm --cached SmartOfferBooking.API/.env
git commit -m "Stop tracking local env files"
```

Then push again.

## Suggested Submission Extras

- frontend screenshots
- Swagger screenshot
- ER diagram
- 2 to 3 minute demo video
- setup steps
- hackathon credentials and assumptions
