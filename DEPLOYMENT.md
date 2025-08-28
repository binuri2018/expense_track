# 🚀 Deployment Guide - New Structure

## 📁 New Project Structure

```
expense-tracker/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── netlify.toml
├── server/                 # Node.js backend
│   ├── server.js
│   ├── package.json
│   ├── config.env
│   ├── models/
│   ├── routes/
│   └── middleware/
├── package.json            # Root package.json
└── README.md
```

## 🚀 Frontend Deployment (Netlify)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Restructured project with separate client/server folders"
git push origin main
```

### Step 2: Deploy to Netlify
1. Go to [https://app.netlify.com/](https://app.netlify.com/)
2. Click **"New site from Git"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository
5. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18`
6. Click **"Deploy site"**

### Step 3: Environment Variables
After deployment, go to **Site settings > Environment variables** and add:
```
REACT_APP_API_URL=https://your-backend-url.com
```

## 🖥️ Backend Deployment

### Option 1: Render (Recommended - Free)

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `expense-tracker-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: `18`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: `10000` (Render's default)
6. Click **"Create Web Service"**

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Set **Root Directory** to `server`
5. Add environment variables from `server/config.env`
6. Deploy automatically

### Option 3: Heroku

1. Go to [heroku.com](https://heroku.com)
2. Create new app
3. Connect GitHub repository
4. Set **Root Directory** to `server`
5. Add environment variables
6. Deploy

## 🔧 Local Development

### Install Dependencies
```bash
# Install all dependencies (both client and server)
npm run install-all

# Or install separately:
npm run install-server
npm run install-client
```

### Start Development
```bash
# Start both frontend and backend
npm run dev

# Or start separately:
npm run server    # Backend only
npm run client    # Frontend only
```

## 🌐 Production URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.onrender.com` (or similar)

## 🔗 Connect Frontend to Backend

1. Update the frontend environment variable in Netlify:
   - Go to **Site settings > Environment variables**
   - Add: `REACT_APP_API_URL=https://your-backend-url.com`

2. Update CORS in your backend (`server/server.js`):
```javascript
app.use(cors({
  origin: ['https://your-app.netlify.app', 'http://localhost:3000'],
  credentials: true
}));
```

## 📋 Deployment Checklist

### Frontend (Netlify)
- [ ] Code pushed to GitHub
- [ ] Netlify connected to repository
- [ ] Build settings configured correctly
- [ ] Environment variables set
- [ ] Site deployed successfully

### Backend (Render/Railway/Heroku)
- [ ] Code pushed to GitHub
- [ ] Service created with correct root directory
- [ ] Environment variables added
- [ ] Service deployed successfully
- [ ] API endpoints tested

### Integration
- [ ] Frontend environment variable updated with backend URL
- [ ] CORS configured for frontend domain
- [ ] Authentication working
- [ ] CRUD operations working
- [ ] Charts and data visualization working

## 🐛 Troubleshooting

### Common Issues

1. **Build fails on Netlify**
   - Check Node.js version
   - Verify build command and publish directory
   - Check for missing dependencies

2. **Backend deployment fails**
   - Verify root directory is set to `server`
   - Check environment variables
   - Ensure `package.json` is in the server folder

3. **API connection errors**
   - Verify backend URL in frontend environment variables
   - Check CORS configuration
   - Test API endpoints directly

4. **Authentication issues**
   - Verify JWT_SECRET is set correctly
   - Check token handling in frontend
   - Ensure secure cookie settings

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints with Postman
4. Check browser console for frontend errors
5. Review server logs for backend errors
