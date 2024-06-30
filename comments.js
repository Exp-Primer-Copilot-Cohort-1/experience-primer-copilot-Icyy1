// Create web server
// Framework: Express
// Database: MongoDB

// Importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Importing routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

// Importing middleware
const authMiddleware = require('./middleware/auth');

// Creating express app
const app = express();

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/user', authMiddleware, userRoutes);
app.use('/post', authMiddleware, postRoutes);

// Starting server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});