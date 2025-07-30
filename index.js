const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const hpp = require('hpp');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const connectDB = require('./src/database/connection');
const errorHandler = require('./src/middleware/errorHandler');

// Import routes
const patientRoutes = require('./src/routes/patient/patient');
const billingRoutes = require('./src/routes/billing/billing');
const authRoutes = require('./src/routes/auth/auth');
const adminViewRoutes = require('./src/routes/admin/admin');
const adminApiRoutes = require('./src/routes/superAdmin/adminRoutes');

const app = express();

// Connect to MongoDB
connectDB().then(() => {
    console.log('Database connection ready');
}).catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', 'layouts/main');

// File Upload
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    createParentPath: true
}));

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
app.use(hpp());

// Routes
app.use('/api/v1/admin', adminApiRoutes);

// Auth routes
app.use('/auth', authRoutes);

// Patient routes (includes both view and API routes)
app.use('/patient', patientRoutes);

// Admin view routes
app.use('/admin', adminViewRoutes);

// Billing routes
app.use('/billing', billingRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('pages/auth/login', {
        title: 'Login',
        success_msg: '',
        error_msg: '',
        layout: false,
        pageCSS: 'auth/login.css'
    });
});

// Error handling
app.use(errorHandler);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});