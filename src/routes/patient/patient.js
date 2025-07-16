nodemonconst express = require('express');
const router = express.Router();

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

module.exports = router; 