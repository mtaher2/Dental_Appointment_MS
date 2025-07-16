const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
    res.render('pages/auth/login', {
        title: 'Login',
        success_msg: '',
        error_msg: '',
        layout: false
    });
});

// Forgot password page
router.get('/forgot-password', (req, res) => {
    res.render('pages/auth/forgot-password', {
        title: 'Forgot Password',
        success_msg: '',
        error_msg: '',
        layout: false
    });
});

// Check email page
router.get('/check-email', (req, res) => {
    res.render('pages/auth/check-email', {
        title: 'Check Your Email',
        success_msg: '',
        error_msg: '',
        layout: false
    });
});

// Reset password page
router.get('/reset-password', (req, res) => {
    res.render('pages/auth/reset-password', {
        title: 'Reset Password',
        success_msg: '',
        error_msg: '',
        token: req.query.token || '',
        layout: false
    });
});

// Success page
router.get('/success', (req, res) => {
    res.render('pages/auth/success', {
        title: 'Password Reset Success',
        success_msg: '',
        error_msg: '',
        layout: false
    });
});

module.exports = router; 