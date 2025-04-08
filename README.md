# Hairdresser Appointment Management System

This project is a full-stack web application for managing hairdresser appointments. It is built using the MERN stack (MongoDB, Express.js, React, Node.js) and includes both backend and frontend components.

## Backend

The backend is built with Node.js and Express.js and uses MongoDB as the database.

### Key Components

- **Configuration**: Located in the `backend/config` directory.
  - [`allowedOrigins.js`](backend/config/allowedOrigins.js)
  - [`constants.js`](backend/config/constants.js)
  - [`corsOptions.js`](backend/config/corsOptions.js)
  - [`dbConn.js`](backend/config/dbConn.js)
  - [`session.js`](backend/config/session.js)

- **Controllers**: Located in the `backend/controllers` directory.
  - [`appointmentController.js`](backend/controllers/appointmentController.js)
  - [`authController.js`](backend/controllers/authController.js)
  - [`usersController.js`](backend/controllers/usersController.js)

- **Middleware**: Located in the `backend/middleware` directory.

- **Models**: Located in the `backend/models` directory.

- **Routes**: Located in the `backend/routes` directory.

- **Utilities**: Located in the `backend/utils` directory.

- **Server**: The main server file is [`server.js`](backend/server.js).

### Environment Variables

The backend uses a `.env` file for configuration. Here are the required environment variables:

- `NODE_ENV`: The environment in which the application is running (e.g., `development`, `production`).
- `TZ`: The timezone for the application (e.g., `Europe/Berlin`).
- `ALLOWED_ORIGINS`: All allowed origins for CORS as a comma seperated string (e.g., `http://localhost:5173,http://localhost:5200`).
- `FRONTEND_URL`: The URL of the frontend application (e.g., `http://localhost:5173`).
- `DATABASE_URI`: The URI for connecting to the MongoDB database.
- `BCRYPT_SALT_ROUNDS`: The number of salt rounds for bcrypt hashing used to hash user passwords.
- `SESS_NAME`: The name of the session cookie.
- `SESS_SECRET`: The secret key for signing the session cookie.
- `SESS_LIFETIME`: The lifetime of the session cookie in milliseconds.
- `RESET_PASSWORD_TOKEN_SECRET`: The secret key for signing reset password tokens.
- `EXPIRATION_RESET_TOKEN`: The expiration time for reset password tokens in seconds.
- `BUSINESS_EMAIL_ADDRESS`: The email address used to send automated emails from (f.e., for password resets). Using Gmail is recommended here.
- `BUSINESS_EMAIL_PASSWORD`: The app password for the business email address, which enables the backend to send automated emails.
- `NON_DELETABLE_USER_IDS`: All user ids that are protected from deletion as a comma seperated string (e.g., `64d128cd0b6a591f726d5abd,67214b3d82762ad0941456c4`).

### Running the Backend

Make sure to create the aforementioned `.env` file for configuration.

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

## Frontend
The frontend is built with React, TypeScript, and Vite.

### Key Components
**Configuration**: Configuration files such as .env, .eslintrc.cjs, and vite.config.ts.

### Environment Variables

The frontend uses a `.env` file for configuration. Here are the required environment variables:

- `NODE_ENV`: The environment in which the application is running (e.g., `development`, `production`).
- `TZ`: The timezone for the application (e.g., `Europe/Berlin`).
- `VITE_SHOPNAME`: Name of the hairdresser shop.
- `VITE_CITY`: Name of the city the hairdresser shop is located in.
- `VITE_PLZ`: Postal code of hairdresser shop location (e.g., `97072`).
- `VITE_STREET`: Street and housenumber of hairdresser shop location.
- `VITE_PHONENUMBER`: Phonenumber of the hairdresser shop.
- `VITE_EMAIL`: Email address of the hairdresser shop.
- `VITE_INSTAGRAM`: URL of the hairdresser shops instagram account.
- `VITE_FACEBOOK`: URL of the hairdresser shops facebook account.
- `VITE_API_BASEURL`: the base URL of the backend api (e.g., `http://localhost:3500`).
- `VITE_IMPRESSUM_FIRSTNAME`: Firstname displayed in Impressum.
- `VITE_IMPRESSUM_LASTNAME`: Lastname displayed in Impressum.
- `VITE_IMPRESSUM_EMAIL`: Email displayed in Impressum.
- `VITE_IMPRESSUM_STREET`: Street displayed in Impressum.
- `VITE_IMPRESSUM_PLZ`: Postal code displayed in Impressum.
- `VITE_IMPRESSUM_CITY`: City displayed in Impressum.


### Running the Frontend

Make sure to create the aforementioned `.env` file for configuration.

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```
