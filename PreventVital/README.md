# PreventVital - Advanced Health Monitoring Platform

PreventVital is a cutting-edge health monitoring and e-commerce platform designed to bridge the gap between patients, medical devices, and healthcare connectivity. It features a robust RBAC system, a comprehensive e-commerce shop for medical devices, and personalized customer dashboards.

## 🚀 Tech Stack

### Frontend (`/client`)
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS, Shadcn/UI
*   **State Management:** Redux Toolkit
*   **Routing:** React Router DOM
*   **HTTP Client:** Axios

### Backend (`/server`)
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (Mongoose)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Payment Gateway:** Razorpay
*   **PDF Generation:** PDFKit

## 📂 Project Structure

```
PreventVital/
├── client/                 # Frontend Application
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── features/       # Feature-based modules (shop, subscription)
│       ├── pages/          # Page components
│       ├── store/          # Redux state slices
│       └── ...
└── server/                 # Backend API
    ├── public/             # Static files (invoices, product images)
    └── src/
        ├── controllers/    # Request handlers
        ├── models/         # Mongoose schemas
        ├── routes/         # API route definitions
        ├── services/       # Business logic (Invoice, Email)
        └── ...
```

## 🛠️ Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)

### 1. Backend Setup
```bash
cd server
npm install
# Ensure .env is configured (see .env.example if available)
node src/scripts/seedData.js  # Seed initial data (Admins, Products)
npm start                     # Start the server (default port 5000)
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev                   # Start Vite dev server (default port 5173)
```

## ✨ Key Features

*   **Role-Based Access Control (RBAC):** Distinct portals for Super Admin, Admin, Corporate, Creator, and Customer.
*   **E-Commerce Shop:** Full flow including Catalog, Product Details, Cart, and Checkout.
*   **Smart Subscription:** Tiered membership plans (Free, Basic, Premium, Enterprise).
*   **Health Dashboard:** Real-time tracking of vitals (BP, Heart Rate, Glucose) and gamification goals.
*   **Dynamic Content:** Content Management System for health articles and videos.

## 👥 Default Credentials (Seed Data)

*   **Super Admin:** superadmin@gruentzig.ai / Admin@123456
*   **Customer:** ramesh.kumar@example.com / User@123456
