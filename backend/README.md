# Event Management System - Backend

This is the backend API for the Event Management System, built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── config/                 # Configuration files
├── controller/            # Route controllers
├── middleware/            # Custom middleware
├── models/                # Database models
├── routes/                # API route definitions
├── server.js              # Entry point
└── .env                   # Environment variables
```

## API Routes

### Authentication Routes (`/api/auth`)

| Method | Endpoint       | Description                          | Access  |
|--------|----------------|--------------------------------------|---------|
| POST   | /register      | Register a new user                  | Public  |
| POST   | /login         | Authenticate user and get JWT token  | Public  |

### User Routes (`/api/users`)

| Method | Endpoint       | Description                          | Access       |
|--------|----------------|--------------------------------------|--------------|
| GET    | /              | Get all users (Admin only)           | Admin        |
| GET    | /:id           | Get user by ID                       | Authenticated|
| PUT    | /:id           | Update user profile                  | Owner/Admin  |
| DELETE | /:id           | Delete user account                  | Owner/Admin  |

### Event Routes (`/api/events`)

| Method | Endpoint       | Description                          | Access       |
|--------|----------------|--------------------------------------|--------------|
| GET    | /              | Get all events                       | Public       |
| GET    | /:id           | Get event by ID                      | Public       |
| POST   | /              | Create new event                     | Admin        |
| PUT    | /:id           | Update event                         | Admin        |
| DELETE | /:id           | Delete event                         | Admin        |
| POST   | /:id/register  | Register for an event                | Authenticated|

### Vendor Routes (`/api/vendors`)

| Method | Endpoint       | Description                          | Access       |
|--------|----------------|--------------------------------------|--------------|
| GET    | /              | Get all vendors                      | Public       |
| GET    | /:id           | Get vendor by ID                     | Public       |
| POST   | /              | Create new vendor                    | Admin        |
| PUT    | /:id           | Update vendor                        | Admin/Vendor |
| DELETE | /:id           | Delete vendor                        | Admin        |

## Authentication Flow

1. **Registration**: 
   - User sends POST request to `/api/auth/register` with email, password, and user details
   - System hashes the password and creates a new user in the database
   - Returns JWT token for authentication

2. **Login**:
   - User sends POST request to `/api/auth/login` with email and password
   - System verifies credentials and returns JWT token if valid

3. **Protected Routes**:
   - Client includes JWT in Authorization header for protected routes
   - Server verifies token and grants access if valid

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`

3. Start the development server:
   ```bash
   npx nodemon server.js
   ```

4. The API will be available at `http://localhost:5000`

## Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: For authentication
- bcryptjs: For password hashing
- cors: Enable Cross-Origin Resource Sharing
- dotenv: Load environment variables
- express-validator: Request validation

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Testing

To run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
