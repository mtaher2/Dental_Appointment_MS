const express = require('express');
const router = express.Router();

// Real-Time Dashboard page
router.get('/dashboard', (req, res) => {
    res.render('pages/doctor/dashboard', {
        title: 'Real-Time Dashboard - MediCare',
        success_msg: '',
        error_msg: ''
    });
});

// Profile Settings page
router.get('/profile-settings', (req, res) => {
    res.render('pages/doctor/profile-settings', {
        title: 'Profile Settings - HealthPlus',
        success_msg: '',
        error_msg: ''
    });
});

// Patient File page
router.get('/patient-file', (req, res) => {
    res.render('pages/doctor/patient-file', {
        title: 'Patient File - Dr. Emily Carter',
        success_msg: '',
        error_msg: ''
    });
});

// Availability Management page
router.get('/availability-management', (req, res) => {
    res.render('pages/doctor/availability-management', {
        title: 'Availability Management - HealthPlus',
        success_msg: '',
        error_msg: ''
    });
});

// Alternative route names for easier access
router.get('/availability', (req, res) => {
    res.redirect('/doctor/availability-management');
});

router.get('/profile', (req, res) => {
    res.redirect('/doctor/profile-settings');
});

router.get('/patient/:id?', (req, res) => {
    // If patient ID is provided, you can use it later for dynamic content
    const patientId = req.params.id;
    res.render('pages/doctor/patient-file', {
        title: 'Patient File - Dr. Emily Carter',
        patientId: patientId || null,
        success_msg: '',
        error_msg: ''
    });
});

module.exports = router; 