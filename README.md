# NoteSaver Project

This project consists of a client-side (React) and a backend (Node.js with Express and MongoDB) application for managing notes with OTP-based authentication.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Client Setup](#2-client-setup)
- [Environment Variables](#environment-variables)
  - [Backend](#backend)
  - [Email Configuration](#email-configuration)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with OTP verification
- Secure authentication using JWT stored in HTTP-only cookies
- Create, view, and manage notes
- Responsive UI for login, signup, and dashboard pages
- Styled with Tailwind CSS
- MongoDB for database storage
- Email sending for OTP verification

## Project Structure

```
noteSaver/
├── backend/                  # Node.js Express backend
│   ├── controller/           # API logic
│   │   ├── auth.controller.js
│   │   └── note.controller.js
│   ├── lib/                  # Utility functions (DB, OTP, JWT, Email)
│   │   ├── db.js
│   │   ├── getOTP.js
│   │   ├── sendEmail.js
│   │   └── utils.js          # Contains generateToken
│   ├── modals/               # Mongoose models
│   │   ├── note.modal.js
│   │   └── user.modal.js
│   ├── routes/               # API routes
│   │   ├── auth.route.js
│   │   └── note.route.js
│   ├── middleware/           # Authentication middleware
│   │   └── auth.middleware.js
│   ├── server.js             # Main server file
│   └── package.json
├── client/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/            # Login, Signup, Dashboard
│   │   ├── routes/
│   │   ├── store/
│   │   └── ...
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   Node.js (LTS version recommended)
*   npm or yarn
*   MongoDB instance (local or cloud-hosted like MongoDB Atlas)

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Backend Setup

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env` file in the `backend` directory** and configure your environment variables (see [Environment Variables](#environment-variables) section).

4.  **Start the backend server:**
    ```bash
    node server.js
    # or if using nodemon (recommended for development)
    npm run dev
    ```
    The backend server will run on `http://localhost:5000` (or your specified `PORT`).

### 2. Client Setup

1.  **Navigate to the `client` directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env` file in the `client` directory** and configure your environment variables (if any are needed for the client, e.g., API base URL).

4.  **Start the client development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The client application will typically open in your browser at `http://localhost:5173` (or another port as indicated by Vite).

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory with the following variables:

*   `PORT`: Port for the backend server (e.g., `5000`)
*   `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/noteSaver` or your Atlas URI)
*   `JWT_SECRET`: A strong, secret key for JWT token signing (e.g., `your_jwt_secret_key`)

### Email Configuration

To enable OTP email functionality, add these to your `backend/.env` file:

*   `EMAIL_USER`: Your Gmail address (e.g., `your_email@gmail.com`)
*   `EMAIL_PASS`: Your Gmail App Password. **Do not use your regular Gmail password.** You need to generate an App Password from your Google Account security settings. Refer to [Google's documentation](https://support.google.com/accounts/answer/185833) for instructions on how to generate one.

## API Endpoints

Here are the main API endpoints for authentication:

**Authentication Routes (`/api/auth`)**

*   `POST /api/auth/signup`: Register a new user and send OTP.
*   `POST /api/auth/verify-otp`: Verify user's OTP.
*   `POST /api/auth/login`: Login user with email and OTP.
*   `POST /api/auth/resend-otp`: Resend OTP to user's email.
*   `GET /api/auth/checkAuth`: Check if user is authenticated (protected route).

**Note Routes (`/api/notes`)**

*   (To be implemented: CRUD operations for notes)

## Contributing

Contributions are welcome! Please follow standard practices for submitting pull requests.

## License

This project is licensed under the MIT License.

