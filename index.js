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

// Routes

// Home route
app.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Welcome',
        success_msg: '',
        error_msg: ''
    });
});

// Receptionist Dashboard route
app.get('/receptionist/dashboard', (req, res) => {
    res.render('pages/receptionist/dashboard', {
        title: 'Dashboard',
        success_msg: '',
        error_msg: '',
        patients: [
            {
                id: 1,
                patientName: 'John Doe',
                appointmentTime: '09:00 AM',
                serviceType: 'Regular Checkup',
                doctorName: 'Dr. Smith',
                room: 'Room 101',
                status: 'Scheduled'
            },
            {
                id: 2,
                patientName: 'Jane Smith',
                appointmentTime: '10:30 AM',
                serviceType: 'Cleaning',
                doctorName: 'Dr. Johnson',
                room: 'Room 102',
                status: 'In Progress'
            },
            {
                id: 3,
                patientName: 'Mike Wilson',
                appointmentTime: '02:00 PM',
                serviceType: 'Cavity Filling',
                doctorName: 'Dr. Brown',
                room: 'Room 103',
                status: 'Completed'
            }
        ]
    });
});

// Appointments page route
app.get('/receptionist/appointments', (req, res) => {
    res.render('pages/receptionist/appointments', {
        title: 'Appointments',
        success_msg: '',
        error_msg: ''
    });
});

// New Appointment page route
app.get('/receptionist/appointments/new', (req, res) => {
    res.render('pages/receptionist/new-appointment', {
        title: 'New Appointment',
        success_msg: '',
        error_msg: ''
    });
});

// Patient Management page route
app.get('/receptionist/patients', (req, res) => {
    res.render('pages/receptionist/patient-management', {
        title: 'Patient Management',
        success_msg: '',
        error_msg: '',
        patient: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            address: '123 Main St',
            dateOfBirth: '1990-01-01',
            gender: 'Male',
            emergencyContact: 'Jane Doe',
            emergencyPhone: '+1234567891'
        }
    });
});

// Edit Patient page route
app.get('/receptionist/patients/:id/edit', (req, res) => {
    res.render('pages/receptionist/edit-patient', {
        title: 'Edit Patient',
        success_msg: '',
        error_msg: '',
        patient: {
            id: req.params.id,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            address: '123 Main St',
            dateOfBirth: '1990-01-01',
            gender: 'Male',
            language: 'English',
            emergencyContact: 'Jane Doe',
            emergencyPhone: '+1234567891'
        }
    });
});

// Add Family Member page route
app.get('/receptionist/family-members/add', (req, res) => {
    res.render('pages/receptionist/add-family-member', {
        title: 'Add Family Member',
        success_msg: '',
        error_msg: ''
    });
});

// Billing page route
app.get('/receptionist/billing', (req, res) => {
    res.render('pages/receptionist/billing', {
        title: 'Billing Support',
        success_msg: '',
        error_msg: ''
    });
});

// Receipts page route
app.get('/receptionist/billing/receipts', (req, res) => {
    res.render('pages/receptionist/receipts', {
        title: 'Receipts',
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