const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// require('dotenv').config();

// const connectDB = require('./src/database/connection');
// const errorHandler = require('./src/middleware/errorHandler');

// Import routes
const authRoutes = require('./src/routes/auth/auth');
const patientRoutes = require('./src/routes/patient');

const app = express();

// Connect to MongoDB
// connectDB();

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', 'layouts/main');

// Serve static files
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https:", "data:"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'"],
        },
    },
}));
app.use(morgan('dev'));
app.use(compression());
// app.use(mongoSanitize());
// app.use(xss());
// app.use(hpp());

// // Rate limiting
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000, // 1 hour
//     message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Auth routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Welcome',
        success_msg: '',
        error_msg: ''
    });
});

// Register patient routes
app.use('/patient', patientRoutes);

// Error handling
// app.use(errorHandler);

// Handle unhandled routes
app.all('*', (req, res) => {
    res.status(404).render('pages/home', {
        title: '404 - Not Found',
        success_msg: '',
        error_msg: 'Page not found'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
}); 