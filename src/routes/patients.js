const express = require('express');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const router = express.Router();

// ===== VIEW ROUTES (Public) =====

// Payment Options
router.get('/payment', (req, res) => {
  res.render('pages/patient/paymentOptions', {
    title: 'Payment Options',
    success_msg: '',
    error_msg: ''
  });
});

// Payment History
router.get('/payment-history', (req, res) => {
  res.render('pages/patient/paymentHistory', {
    title: 'Payment History',
    success_msg: '',
    error_msg: ''
  });
});

// Invoices
router.get('/invoices', (req, res) => {
  res.render('pages/patient/invoices', {
    title: 'Invoices',
    success_msg: '',
    error_msg: ''
  });
});

// My Health Record
router.get('/health-record', (req, res) => {
  res.render('pages/patient/healthRecord', {
    title: 'My Health Record',
    success_msg: '',
    error_msg: ''
  });
});

// Family Dashboard
router.get('/family-dashboard', (req, res) => {
  res.render('pages/patient/familyDashboard', {
    title: 'Family Dashboard',
    success_msg: '',
    error_msg: ''
  });
});

// Select Doctor Page
router.get('/select-doctor', (req, res) => {
    res.render('pages/patient/select-doctor', {
        title: 'Select a Doctor',
        success_msg: '',
        error_msg: ''
    });
});

// Book Appointment Page
router.get('/book-appointment', (req, res) => {
    res.render('pages/patient/book-appointment', {
        title: 'Book Appointment',
        success_msg: '',
        error_msg: ''
    });
});

// Appointment Confirmed Page
router.get('/appointment-confirmed', (req, res) => {
    res.render('pages/patient/appointment-confirmed', {
        title: 'Appointment Confirmed',
        success_msg: '',
        error_msg: ''
    });
});

// Rate Your Dentist Page
router.get('/rate-dentist', (req, res) => {
    res.render('pages/patient/rate-dentist', {
        title: 'Rate Your Dentist',
        success_msg: '',
        error_msg: ''
    });
});

// Share Your Experience Page
router.get('/share-experience', (req, res) => {
    res.render('pages/patient/share-experience', {
        title: 'Share Your Experience',
        success_msg: '',
        error_msg: ''
    });
});

// ===== API ROUTES =====

// Public API routes
router.post('/api/login', authController.login);
router.post('/api/forgotPassword', authController.forgotPassword);
router.post('/api/verifyOTP', authController.verifyOTP);
router.post('/api/resetPassword', authController.resetPassword);

// Protected API routes
router.use('/api', authController.protect);

// Profile API routes
router.get('/api/profile', patientController.getProfile);
router.patch('/api/profile', patientController.updateProfile);
router.patch('/api/updatePassword', authController.updatePassword);
router.patch('/api/emergencyContact', patientController.updateEmergencyContact);

// Family member API routes
router.get('/api/family', patientController.getFamilyMembers);
router.post('/api/family', patientController.addFamilyMember);

// Activity log API
router.get('/api/activity', patientController.getActivityLog);

module.exports = router; 