# Advanced Todo App 🚀

A full-stack, feature-rich Todo application built with React, Node.js, and MongoDB. Manage your tasks efficiently with a modern, responsive interface and powerful productivity features.

![Advanced Todo App](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green) ![JWT](https://img.shields.io/badge/Auth-JWT-orange) ![Real-time](https://img.shields.io/badge/Features-Real--time-yellow)


[![Alt Text for the video, e.g., Watch the demo](https://img.youtube.com/vi/OPc_BSfm35w/hqdefault.jpg)](https://www.youtube.com/watch?v=OPc_BSfm35w)
### 🎥 Preview - Watch the Quick Demo Below

[![Click to watch the video demo](https://img.youtube.com/vi/OPc_BSfm35w/hqdefault.jpg)](https://www.youtube.com/watch?v=OPc_BSfm35w)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with JWT tokens
- **Password Encryption** using bcryptjs
- **Protected Routes** with authentication middleware
- **Password Change** functionality
- **Session Management** with secure token storage

### 📝 Todo Management
- **Create Todos** with title, description, category, priority, due dates, and tags
- **Read Todos** with advanced filtering and sorting
- **Update Todos** - mark complete/incomplete, edit details
- **Delete Todos** with confirmation dialogs
- **Real-time Updates** using Socket.io

### 🎯 Advanced Features
- **Categories** (Work, Personal, Shopping, Health, Education, General)
- **Priority Levels** (High, Medium, Low)
- **Due Dates** with overdue indicators
- **Tags System** for better organization
- **Search Functionality** across titles and descriptions
- **Multiple Sort Options** (Date, Title, Priority, Due Date)

### 📊 Analytics & Statistics
- **Dashboard** with overview statistics
- **Progress Tracking** with completion percentages
- **Category-wise Analytics**
- **Overdue Tasks** monitoring
- **Real-time Stats** updates

### 🎨 User Experience
- **Responsive Design** for all devices
- **Modern UI** with glass morphism effects
- **Loading States** and error handling
- **Intuitive Navigation** with active states
- **Server Status** indicator

## 🛠 Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Socket.io Client
- date-fns
- CSS3 with Custom Properties

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs
- Socket.io
- Express Validator
- Helmet & CORS

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/techgit41/Advanced-Todo-App
cd advanced-todo-app
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configurations

npm run dev
```

3. **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm start
```

### Environment Configuration

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/advanced-todoapp
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📁 Project Structure

```
advanced-todo-app/
├── backend/
│   ├── server.js              # Express server
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
└── frontend/
    ├── public/
    │   └── index.html         # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── Auth/          # Login & Register
    │   │   ├── Dashboard/     # Overview dashboard
    │   │   ├── Layout/        # Navigation & Footer
    │   │   ├── Stats/         # Analytics & statistics
    │   │   ├── Todos/         # Todo management
    │   │   └── User/          # User profile
    │   ├── contexts/          # React contexts (Auth)
    │   ├── hooks/             # Custom hooks (useApi)
    │   ├── config/            # API configuration
    │   ├── App.js             # Main App component
    │   ├── App.css            # Global styles
    │   ├── index.js           # React entry point
    │   └── index.css          # Base styles
    └── package.json           # Frontend dependencies
```

## 🎮 Usage

### Getting Started
1. **Register** a new account or **Login** with existing credentials
2. **Access the Dashboard** to see your productivity overview
3. **Create Todos** using the "Add Todo" button
4. **Organize** tasks with categories, priorities, and due dates
5. **Track Progress** through the Statistics page
6. **Manage Account** in the Profile section

### Key Features in Action
- **Real-time Updates**: See changes instantly across all devices
- **Advanced Filtering**: Filter by category, priority, completion status
- **Smart Search**: Find todos by title or description
- **Progress Analytics**: Monitor your productivity with detailed stats
- **Responsive Design**: Use on desktop, tablet, or mobile

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `PUT /api/auth/change-password` - Change password
- `GET /api/auth/profile` - Get user profile

### Todos
- `GET /api/todos` - Get all todos (with filtering)
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Statistics
- `GET /api/todos/stats` - Get todo statistics

### Health Check
- `GET /api/health` - Server status

## 🗄 Database Models

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Todo Model
```javascript
{
  title: String,
  description: String,
  category: String,
  priority: String (enum: low, medium, high),
  dueDate: Date,
  completed: Boolean,
  userId: ObjectId,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Set environment variables
heroku config:set JWT_SECRET=your-production-secret
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
# Build
npm run build

# Deploy build folder to your preferred platform
```

### Environment Variables for Production

**Backend (.env)**
```env
MONGODB_URI=your-production-mongodb-uri
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

**Frontend (.env)**
```env
REACT_APP_API_URL=https://your-backend.herokuapp.com
```

## 🐛 Troubleshooting

### Common Issues

**Connection Issues:**
- Ensure backend is running on port 5000
- Check MongoDB connection
- Verify CORS configuration

**Authentication Issues:**
- Clear browser localStorage
- Check JWT token expiration
- Verify password requirements

**Todo Operations:**
- Check network requests in browser dev tools
- Verify todo ownership
- Check server logs for validation errors

### Debug Mode
Enable debug logs by checking browser console and backend terminal for detailed error messages.

## 🛠 Development

### Running in Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Testing the Application
1. **Backend Health Check**: Visit `http://localhost:5000/api/health`
2. **Frontend Application**: Visit `http://localhost:3000`
3. **Create Test User**: Register a new account
4. **Test Features**: Create, update, delete todos to verify functionality

### Building for Production
```bash
cd frontend
npm run build
```

## 🤝 Contributing

I welcome contributions! Please feel free to submit pull requests, report bugs, or suggest new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for robust database solutions
- Express.js team for the lightweight web framework
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help with setup:
1. Check the troubleshooting section above
2. Open an issue on [GitHub](https://github.com/techgit41)


---

**⭐ Star this repo if you found it helpful!**

**🐛 Found a bug?** Open an issue and we'll fix it!

**💡 Have a feature request?** We'd love to hear your ideas!

---

*Built with ❤️ using React, Node.js, and MongoDB*
