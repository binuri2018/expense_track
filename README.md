# 💰 Expense Tracker Dashboard

A full-stack MERN application for tracking personal expenses with beautiful charts and analytics.

## ✨ Features

- **User Authentication**: Secure registration and login with JWT
- **Expense Management**: Full CRUD operations for expenses
- **Beautiful Dashboard**: Modern, responsive design with statistics
- **Data Visualization**: Interactive pie charts and bar charts
- **Category Management**: Predefined expense categories with color coding
- **Responsive Design**: Works perfectly on all devices

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Chart library
- **CSS3** - Styling with modern design

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-dashboard
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   - Copy `server/config.env` to `server/.env`
   - Update MongoDB connection string
   - Set your JWT secret

4. **Start the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get user data

### Expenses
- `GET /api/expenses` - Get all user expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get expense summary for charts

## 📱 Usage

1. **Register/Login**: Create an account or sign in
2. **Add Expenses**: Use the form to add new expenses with title, category, and amount
3. **View Dashboard**: See your expense statistics and charts
4. **Manage Expenses**: Edit or delete existing expenses
5. **Analyze Spending**: Use charts to understand your spending patterns

## 🎨 Features in Detail

### Expense Categories
- Food & Dining 🍕
- Transportation 🚗
- Shopping 🛍️
- Entertainment 🎬
- Bills & Utilities 💡
- Healthcare 🏥
- Education 📚
- Travel ✈️
- Other 📦

### Dashboard Features
- **Total Expenses**: Shows total amount spent
- **Expense Count**: Number of expenses recorded
- **Category Breakdown**: Pie chart showing spending by category
- **Category Comparison**: Bar chart for easy comparison
- **Quick Stats**: Additional statistics and averages

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- User data isolation

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
```

### MongoDB Schema

#### User Schema
```javascript
{
  username: String,
  email: String (unique),
  passwordHash: String,
  timestamps: true
}
```

#### Expense Schema
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  category: String,
  amount: Number,
  timestamps: true
}
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🚀 Deployment

### Heroku
1. Set environment variables in Heroku dashboard
2. Connect your GitHub repository
3. Deploy automatically on push

### Vercel (Frontend)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Deploy

### Railway/Render (Backend)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons from emoji
- Color schemes inspired by modern design trends
- Chart library: Recharts
- UI inspiration from modern web applications

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

**Happy Expense Tracking! 💰📊**
