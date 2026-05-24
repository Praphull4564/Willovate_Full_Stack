# Smart Offer Slot Booking System

A fullstack hackathon project that enables businesses to create time-bound promotional offers with limited booking slots while allowing customers to browse and reserve offers through a public booking platform.

The platform is designed for service-based businesses such as:

- Gym
- Salon
- Restaurant
- Clinic
- Coaching Center
- Turf
- Spa
- Gaming Zone
- Activity Center
- Other local businesses

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

## Backend
- .NET 8 Web API

## Database
- PostgreSQL

## API Documentation
- Swagger / OpenAPI

---

# Features

## Admin Features
- Secure Admin Login
- Business Profile Management
- Offer Management (CRUD)
- Slot Management (CRUD)
- Booking Management
- Dashboard Analytics
- Booking Status Updates
- Offer Status Management

## Customer Features
- Public Offer Listing Page
- Offer Detail Page
- Slot Booking Flow
- Booking Confirmation Page
- Real-Time Slot Availability

## Additional Features
- Responsive UI
- Dark Mode Dashboard
- Dashboard Analytics Charts
- Seeded Demo Data
- Swagger API Documentation
- Real-Time Seat Tracking
- Demo-Safe Fallback Data

---

# Folder Structure

```text
Willovate_Labs/
│
├── src/                          # React frontend source
├── public/                       # Static frontend assets
├── SmartOfferBooking.API/        # .NET 8 backend API
├── FrontEnd_Screenshots/         # Frontend screenshots
├── Swagger_Screenshots/          # Swagger screenshots
├── DATABASE_SCHEMA.md            # Database schema documentation
├── .env.example                  # Frontend environment sample
├── .gitignore
├── README.md
├── package.json
├── vite.config.ts
└── seed.js
```

---

# Project Modules

## 1. Authentication Module
- Admin login using JWT authentication
- Secure route protection

## 2. Business Profile Module
Admin can:
- Create business profile
- Update business details
- Configure opening and closing hours
- Manage contact information

## 3. Offer Management Module
Admin can:
- Create offers
- Edit offers
- Delete offers
- Pause or cancel offers
- Configure pricing and discounts

Offer statuses:
- Draft
- Active
- Paused
- Expired
- Cancelled

## 4. Slot Management Module
Each offer can contain multiple slots.

Admin can configure:
- Slot date
- Start time
- End time
- Capacity
- Availability

Slot statuses:
- Available
- Full
- Closed
- Expired
- Cancelled

## 5. Booking Module
Customers can:
- View offers
- Select slots
- Reserve seats
- Receive booking confirmation

Booking validations:
- Slot availability
- Capacity checks
- Booking limit validation
- Expired offer restriction

## 6. Dashboard Module
Dashboard analytics include:
- Total Offers
- Active Offers
- Total Bookings
- Today's Bookings
- Total Capacity
- Booked Seats
- Available Seats
- Conversion Rate

---

# Business Rules Implemented

- Offer price must be lower than original price
- Expired offers cannot be booked
- Full slots cannot be booked
- Booking references are unique
- Booked count updates automatically
- Cancelled offers are hidden from public listing
- Booking limits per customer are enforced

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY](https://github.com/Praphull4564/Willovate_Full_Stack.git

```

---

# Frontend Setup

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Frontend Environment

Create a `.env` file in the root directory using `.env.example`.

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

Create a `.env` file inside `SmartOfferBooking.API/`.

Example:

```env
POSTGRES_CONNECTION_STRING=Host=localhost;Port=5432;Database=smart_offer_booking;Username=postgres;Password=your_password

JWT_KEY=replace_with_a_secure_secret_key_minimum_32_characters

JWT_ISSUER=SmartOfferBookingAPI
JWT_AUDIENCE=SmartOfferBookingClients
JWT_EXPIRY_MINUTES=1440
```

---

## 5. Run Backend

```bash
dotnet run --project SmartOfferBooking.API/SmartOfferBooking.API.csproj
```

### Backend URLs

```text
API:      http://localhost:5069
Swagger:  http://localhost:5069/swagger
```

---

## 6. Run Frontend

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

The project includes seeded demo content for presentation purposes.

### Included Data
- 12 Sample Offers
- Multiple Future Slots
- Demo Bookings
- Dashboard Analytics
- Booking Trends
- Fallback UI Data

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

Swagger can be used to:
- Test APIs
- Validate request/response models
- Explore API contracts

---

# Screenshots & Documentation

## Included Assets
- FrontEnd_Screenshots/
- Swagger_Screenshots/
- DATABASE_SCHEMA.md
- README.md

---

# GitHub Publish Checklist

Before publishing:

- Remove all real secrets
- Keep only `.env.example`
- Ensure `.env` files are ignored
- Verify JWT keys are not committed
- Add screenshots
- Add ER diagram
- Add demo video link

---

# Recommended .gitignore

```gitignore
node_modules/
dist/
.env
SmartOfferBooking.API/.env
bin/
obj/
```

---

# Important Note About .env Files

If `.env` files were tracked before updating `.gitignore`, remove them using:

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
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main
```

---

# Suggested Submission Assets

- Frontend screenshots
- Swagger screenshots
- ER diagram
- Demo video (2–3 minutes)
- Setup instructions
- Demo credentials

---

# Future Improvements

- QR Code Integration
- Payment Gateway
- Waitlist System
- Email/SMS Notifications
- Coupon Support
- Calendar Slot View
- CSV Export
- Multi-Business Support
- Customer Cancellation Link

---

# License

This project was developed for the Willovate Labs Hackathon.

Participants grant Willovate permission to review, modify, reuse, and integrate submitted code, designs, and documentation into open-source or commercial projects according to hackathon rules.

---

# Authors

Developed as part of the Willovate Labs Hackathon 2026.
