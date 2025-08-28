# 🚀 Expense Tracker Server

Backend API for the Expense Tracker Dashboard built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
server/
├── server.js          # Main server file
├── package.json       # Server dependencies
├── config.env         # Environment variables
├── .env              # Environment variables (copy of config.env)
├── models/           # MongoDB schemas
│   ├── User.js
│   └── Expense.js
├── middleware/       # Custom middleware
│   └── auth.js
└── routes/          # API routes
    ├── auth.js
    └── expenses.js
```

## 🛠️ Installation

```bash
# Install server dependencies
npm install

# Copy environment variables
cp config.env .env

# Start development server
npm run dev

# Start production server
npm start
```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get user data

### Expenses
- `GET /api/expenses` - Get all expenses for user
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get expense summary

## 🚀 Deployment

### Render (Recommended)
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

### Railway
1. Connect your GitHub repository
2. Deploy automatically
3. Add environment variables

### Heroku
1. Create new app
2. Connect GitHub repository
3. Add environment variables
4. Deploy

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation with express-validator
- CORS enabled
- Environment variable protection

## 📊 Database Schema

### User Model
- `username` (String, required)
- `email` (String, required, unique)
- `passwordHash` (String, required)
- `timestamps` (createdAt, updatedAt)

### Expense Model
- `userId` (ObjectId, ref: User, required)
- `title` (String, required)
- `category` (String, required)
- `amount` (Number, required)
- `timestamps` (createdAt, updatedAt)
