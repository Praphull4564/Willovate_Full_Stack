# Smart Offer Slot Booking System

A fullstack hackathon project that allows businesses to create time-bound promotional offers with limited booking slots, while customers can explore and reserve offers through a public booking platform.

Built for businesses such as gyms, salons, restaurants, clinics, coaching centers, gaming zones, spas, turfs, and other service-based industries.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

## Backend

* .NET 8 Web API

## Database

* PostgreSQL

## API Documentation

* Swagger / OpenAPI

---

# Features

## Admin Features

* Secure admin login
* Business profile management
* Offer creation and management
* Slot creation and management
* Booking management
* Dashboard analytics and insights
* Offer status control
* Booking status updates

## Customer Features

* Public offer listing page
* Offer detail page
* Slot-based booking flow
* Booking confirmation page
* Real-time slot availability

## Additional Features

* Responsive UI
* Dark mode dashboard
* Analytics charts
* Demo-safe fallback data
* Seeded sample offers and bookings
* Swagger API documentation

---

FrontEnd_Screenshots/     → Frontend UI previews
Swagger_Screenshots/      → Swagger API screenshots
DATABASE_SCHEMA.md        → Database schema details
README.md                 → Setup and project documentation
---

# Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME](https://github.com/Praphull4564/Willovate_Full_Stack.git
```

---

# Frontend Setup

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Frontend Environment

Create a `.env` file in the project root using `.env.example`.

Example:

```env
VITE_API_BASE_URL=http://localhost:5069/api/v1
VITE_APP_NAME="Smart Offer Slot Booking System"
VITE_ENABLE_LOGS=true
VITE_TOKEN_KEY=smart_offer_token
```

---

# Backend Setup

## 4. Configure Backend Environment

Create a `.env` file inside `SmartOfferBooking.API/` using `SmartOfferBooking.API/.env.example`.

Example:

```env
POSTGRES_CONNECTION_STRING=Host=localhost;Port=5432;Database=smart_offer_booking;Username=postgres;Password=your_password

JWT_KEY=replace_with_a_long_secure_secret_key_at_least_32_characters

JWT_ISSUER=SmartOfferBookingAPI
JWT_AUDIENCE=SmartOfferBookingClients
JWT_EXPIRY_MINUTES=1440
```

---

## 5. Run the Backend

```bash
dotnet run --project SmartOfferBooking.API/SmartOfferBooking.API.csproj
```

### Backend URLs

```text
API:      http://localhost:5069
Swagger:  http://localhost:5069/swagger
```

---

## 6. Run the Frontend

```bash
npm run dev
```

### Frontend URL

```text
http://127.0.0.1:5173
```

---

# Demo Credentials

```text
Email:    admin@willovate.com
Password: Admin@123
```

---

# Demo Data

The project includes seeded demo content for presentation and testing purposes.

### Included Sample Data

* 12 sample offers
* Multiple future slots
* Sample bookings
* Dashboard analytics
* Booking trend charts
* Fallback demo data for UI presentation

---

# Core Modules

## Authentication

* Admin login with JWT authentication

## Business Profile

* Business details management
* Business type configuration
* Operating hours setup

## Offer Management

* Create, update, delete offers
* Offer status management
* Discount and pricing controls

## Slot Management

* Multiple slots per offer
* Capacity tracking
* Availability control

## Booking System

* Public booking flow
* Booking validation
* Capacity validation
* Booking reference generation

## Dashboard

* Offer analytics
* Booking statistics
* Conversion metrics
* Recent booking activity

---

# Business Rules Implemented

* Offer price must be lower than original price
* Expired offers cannot be booked
* Full slots cannot accept bookings
* Booked count updates automatically
* Booking reference numbers are unique
* Cancelled or expired offers are hidden from public listing
* Customer booking limits are enforced

---

# API Endpoints

## Authentication

```http
POST /api/v1/auth/login
```

## Business

```http
POST /api/v1/business
GET  /api/v1/business
PUT  /api/v1/business/{id}
```

## Offers

```http
POST   /api/v1/offers
GET    /api/v1/offers
GET    /api/v1/offers/{id}
PUT    /api/v1/offers/{id}
DELETE /api/v1/offers/{id}
```

## Slots

```http
POST   /api/v1/slots
GET    /api/v1/slots
GET    /api/v1/offers/{offerId}/slots
PUT    /api/v1/slots/{id}
DELETE /api/v1/slots/{id}
```

## Bookings

```http
POST /api/v1/bookings
GET  /api/v1/bookings
GET  /api/v1/bookings/{id}
PUT  /api/v1/bookings/{id}/status
```

## Dashboard

```http
GET /api/v1/dashboard/summary
```

---

# Database Tables

```text
Users
Businesses
Offers
OfferSlots
Bookings
```

---

# Build Commands

## Frontend Build

```bash
npm run build
```

## Backend Build

```bash
dotnet build SmartOfferBooking.API/SmartOfferBooking.API.csproj
```

---

# Swagger Documentation

Swagger UI is available at:

```text
http://localhost:5069/swagger
```

Use Swagger to:

* Test APIs
* Validate request/response models
* Explore API contracts

---

# GitHub Publish Checklist

Before publishing the repository:

* Remove all real secrets
* Keep only `.env.example` files
* Verify JWT keys are not committed
* Verify database credentials are not committed
* Add screenshots and demo assets
* Add ER diagram
* Add demo video link

---

# Important `.env` Note

If `.env` files were already tracked before updating `.gitignore`, remove them from git tracking using:

```bash
git rm --cached .env
git rm --cached SmartOfferBooking.API/.env

git commit -m "Remove tracked env files"
```

Then push again.

---

# Git Commands

## Initialize Git

```bash
git init
git add .
git commit -m "Initial hackathon submission"
```

## Connect GitHub Repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

# Suggested Submission Assets

* Frontend screenshots
* Swagger screenshots
* ER diagram
* Demo video (2–3 minutes)
* README documentation
* Setup instructions
* Demo credentials

---

# Future Improvements

* QR code support
* Payment integration
* Waitlist system
* Email/SMS notifications
* Calendar slot view
* Coupon support
* Customer cancellation link
* CSV export
* Multi-business support

---

# License

This project was developed as part of the Willovate Labs Hackathon submission.

Participants grant Willovate permission to review, modify, reuse, and integrate submitted code, designs, and documentation into open-source or commercial projects as per hackathon rules.

---

# Authors

Developed for the Willovate Labs Hackathon 2026.
