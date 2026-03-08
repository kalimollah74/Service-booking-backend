Service Booking Backend System

A backend API system for a service booking platform where providers can create service slots and customers can book them. The system supports authentication, role-based access control, booking transactions, and simulated payment confirmation.

This project was developed as a backend technical assessment using Node.js, Express.js, Sequelize, and MySQL.

Tech Stack:

Node.js
Express.js
MySQL
Sequelize ORM
JWT Authentication
bcryptjs
express-validator
Nodemon

Features:

User registration and login
JWT-based authentication
Role-Based Access Control (RBAC)
Providers can create service time slots
Customers can view and book available slots
Payment confirmation simulation
Booking cancellation
Double booking prevention using database transactions
Input validation
Global error handling
Clean layered architecture

Project Structure:
service-booking-backend
│
├── src
│ ├── config
│ │ └── db.js
│ │
│ ├── controllers
│ │
│ ├── middlewares
│ │
│ ├── models
│ │
│ ├── routes
│ │
│ ├── services
│ │
│ ├── utils
│ │
│ ├── validators
│ │
│ ├── app.js
│ └── server.js
│
├── package.json
├── README.md
├── .gitignore
└── .env (not committed)

Setup Instructions

1. Clone the Repository
   git clone https://github.com/kalimollah74/Service-booking-backend.git
   cd service-booking-backend
2. Install Dependencies
   npm install
3. Create MySQL Database

Open MySQL and create a database:

CREATE DATABASE service_booking_db; 4. Configure Environment Variables

Create a .env file in the project root:

PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=service_booking_db
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d 5. Run the Project
npm run dev

Server will start at:

http://localhost:5000


API Endpoints
Authentication
Register User

POST /api/auth/register
Example request body:

{
  "name": "Provider One",
  "email": "provider@example.com",
  "password": "123456",
  "role": "PROVIDER"
}
Login

POST /api/auth/login

Example request:

{
  "email": "provider@example.com",
  "password": "123456"
}

Returns a JWT token.

Slot Management
Create Slot (Provider only)

POST /api/slots

Headers

Authorization: Bearer <token>

Example body

{
  "start_time": "2026-03-10T10:00:00.000Z",
  "end_time": "2026-03-10T11:00:00.000Z"
}
Get Available Slots

GET /api/slots/available

Returns all slots with status AVAILABLE.

Booking
Create Booking

POST /api/bookings

Headers

Authorization: Bearer <token>

Example body

{
  "slot_id": 1,
  "amount": 500
}

Creates a booking with status:

PENDING_PAYMENT
Cancel Booking

PATCH /api/bookings/:id/cancel

Headers

Authorization: Bearer <token>
Payment
Confirm Payment

POST /api/payments/confirm-payment

Headers

Authorization: Bearer <token>

Example request

{
  "booking_id": 1,
  "payment_success": true
}
Design Decisions

The system follows a layered architecture to separate concerns and maintain clean code structure.

Layers include:

Routes → API endpoints
Controllers → Request handling
Services → Business logic
Models → Database schema
Middleware → Authentication, RBAC, validation

This architecture improves:

maintainability
scalability
testability
Sequelize ORM was used to manage database models, relationships, and transactions.

How Double Booking Is Prevented:

Double booking is prevented using database transactions and row-level locking.
When a booking request is made:
The system checks if:
the slot is still AVAILABLE
no active booking already exists
If validation passes, booking is created
A database transaction is starte.

Good Job
Thank You
