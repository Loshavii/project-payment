
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const userRoutes = require('./routes/user'); // Existing user routes
// // const coachRoutes = require('./routes/coach'); // Existing coach routes for registration/login
// // const adminRoutes = require('./routes/admin'); // Existing admin routes for managing coaches
// // const coachProfileRoutes = require('./routes/coachProfile'); // New coach profile routes
// // require('dotenv').config();
// // const cors = require('cors');

// // const app = express();
// // const PORT = process.env.PORT || 8001;

// // // Middleware
// // app.use(cors()); // Enable Cross-Origin Resource Sharing
// // app.use(express.json()); // Middleware for parsing JSON request bodies

// // // MongoDB Connection
// // const MONGODB_URI = process.env.MONGODB_URI;

// // mongoose.connect(MONGODB_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // })
// // .then(() => console.log('MongoDB connected')) // Log successful MongoDB connection
// // .catch(err => console.error('Database connection error:', err)); // Handle MongoDB connection errors

// // // Routes
// // app.use('/api/users', userRoutes); // Route for user-related operations
// // app.use('/api/coaches', coachRoutes); // Route for coach-related registration/login operations
// // app.use('/api/admin', adminRoutes); // Admin route for managing coach requests (approve/reject)
// // app.use('/api/coaches', coachProfileRoutes); // Route for coach profile management (new)

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });



const express = require('express');
const paymentRoutes = require('./routes/payment');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); // Existing user routes
const coachRoutes = require('../BACKEND/routes/coach'); // Existing coach routes for registration/login
const adminRoutes = require('./routes/admin'); // Existing admin routes for managing coaches
const coachProfileRoutes = require('./routes/coachProfile'); // Existing coach profile routes
const profileRoutes = require('./routes/userProfile'); // New profile setup routes for user data
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8001;

// CORS configuration options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the origin you want to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(express.json()); // Middleware for parsing JSON request bodies

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected')) // Log successful MongoDB connection
.catch(err => console.error('Database connection error:', err)); // Handle MongoDB connection errors

// Routes
app.use('/api/users', userRoutes); // Route for user-related operations
app.use('/api/coaches', coachRoutes); // Route for coach-related registration/login operations
app.use('/api/admin', adminRoutes); // Admin route for managing coach requests (approve/reject)
app.use('/api/coachesProfiles', coachProfileRoutes); // Route for coach profile management
app.use('/api/profiles', profileRoutes); // Route for handling profile setup (new)
app.use('/api/payments', paymentRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/user'); // User routes
// const coachRoutes = require('./routes/coach'); // Coach routes for registration/login
// const adminRoutes = require('./routes/admin'); // Admin routes for managing coaches
// const coachProfileRoutes = require('./routes/coachProfile'); // Coach profile routes
// const profileRoutes = require('./routes/userProfile'); // User profile setup routes
// require('dotenv').config();
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 8001;

// // CORS configuration
// const corsOptions = {
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
// };

// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json()); // Parse JSON request bodies

// // MongoDB Connection
// const MONGODB_URI = process.env.MONGODB_URI;

// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('Database connection error:', err));

// // Routes
// app.use('/api/users', userRoutes); // User operations
// app.use('/api/coaches', coachRoutes); // Coach registration/login
// app.use('/api/admin', adminRoutes); // Admin coach management
// app.use('/api/coaches', coachProfileRoutes); // Coach profile management
// app.use('/api/profiles', profileRoutes); // User profile setup

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
