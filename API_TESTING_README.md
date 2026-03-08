# Service Booking API - Testing Guide

## 🚀 Server Status
✅ **Server is running on:** `http://localhost:5000`

## 📋 API Testing Methods

### Method 1: Postman (Recommended)
1. **Download Postman** from https://www.postman.com/downloads/
2. **Import Collection:**
   - Open Postman
   - Click "Import" → "File"
   - Select `Service_Booking_API.postman_collection.json`
3. **Test Endpoints:**
   - **Register:** Use your own email/name
   - **Login:** Use the same credentials
   - Copy JWT token from login response
   - Use token in Authorization header for protected routes

### Method 2: Browser
- Visit: `http://localhost:5000/`
- Should show: `{"message":"Service Booking Backend API is running"}`

### Method 3: Command Line (Node.js Script)
```bash
node test-api.js
```

## 🔑 Valid Roles
- `ADMIN`
- `PROVIDER`
- `CUSTOMER`

## 📝 Sample Requests

### Register User
```json
POST http://localhost:5000/api/auth/register
{
  "name": "Your Name",
  "email": "your.email@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "CUSTOMER"
}
```

### Login User
```json
POST http://localhost:5000/api/auth/login
{
  "email": "your.email@example.com",
  "password": "password123"
}
```

## ✅ API Endpoints Available
- `GET /` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/slots` - Create service slot (Provider only)
- `GET /api/slots` - Get all slots
- `POST /api/bookings` - Book a slot (Customer only)
- `GET /api/bookings` - Get user bookings
- `POST /api/payments` - Process payment

## 🔒 Authentication
Most endpoints require JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🐛 Common Issues & Solutions

### Validation Errors
**Error:** `{"message":"Validation failed","errors":[...]}`

**Solution:** Ensure all required fields are provided:
- `name`: Required, non-empty string
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `role`: Required, must be one of: `ADMIN`, `PROVIDER`, `CUSTOMER`

### Email Already Exists
**Error:** `{"message":"Email already exists"}`

**Solution:** Use a different email address for registration.

### Database Connection Issues
**Error:** Database connection failed

**Solution:** Ensure MySQL is running and `.env` credentials are correct.

## 🧪 Test Results
✅ Main endpoint working
✅ User registration working
✅ User login working
✅ Database connected
✅ Server running on port 5000