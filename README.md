# Event Booking Application

An event booking application built with React, Material UI, Node.js, Express, and MySQL.

## Features

- Browse and search events
- View event details
- Book tickets for events
- Manage bookings (view, cancel)
- Create new events
- Responsive design for all devices
- Modern UI with Material Design

## Tech Stack

### Frontend
- React 18
- TypeScript
- Material UI
- React Router
- Axios

### Backend
- Node.js
- Express
- MySQL
- Sequelize ORM

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Database Setup
1. Create a MySQL database named `event_booking`
2. Update database credentials in `backend/config/database.js`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database:
   ```bash
   node scripts/initDb.js
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create event
- PUT `/api/events/:id` - Update event
- DELETE `/api/events/:id` - Delete event

### Bookings
- GET `/api/bookings` - Get all bookings
- GET `/api/bookings/:id` - Get single booking
- POST `/api/bookings` - Create booking
- PUT `/api/bookings/:id` - Update booking status
- DELETE `/api/bookings/:id` - Cancel booking

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get single user
- POST `/api/users` - Create user
- PUT `/api/users/:id` - Update user
