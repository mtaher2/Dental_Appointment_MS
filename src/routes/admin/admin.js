const express = require('express');
const router = express.Router();

// Notification Settings page
router.get('/notification-settings', (req, res) => {
    res.render('pages/admin/notification-settings', {
        title: 'Notification Settings',
        success_msg: '',
        error_msg: ''
    });
});

// Clinic Configuration page
router.get('/clinic-config', (req, res) => {
    res.render('pages/admin/clinicConfig', {
        title: 'Clinic Configuration',
        success_msg: '',
        error_msg: ''
    });
});

// Admin Dashboard
router.get('/dashboard', (req, res) => {
    res.render('pages/admin/dashboard', {
        title: 'Admin Dashboard',
        success_msg: '',
        error_msg: ''
    });
});

module.exports = router; 