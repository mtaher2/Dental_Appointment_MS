const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
    res.render('pages/auth/login', {
        title: 'Login',
        success_msg: '',
        error_msg: '',
        layout: false,
        pageCSS: 'auth/login.css'
    });
});

// Forgot password page
router.get('/forgot-password', (req, res) => {
    res.render('pages/auth/forgot-password', {
        title: 'Forgot Password',
        success_msg: '',
        error_msg: '',
        layout: false,
        pageCSS: 'auth/forgot-password.css'
    });
});

// Check email page
router.get('/check-email', (req, res) => {
    res.render('pages/auth/check-email', {
        title: 'Check Your Email',
        success_msg: '',
        error_msg: '',
        layout: false,
        pageCSS: 'auth/check-email.css'
    });
});

// Reset password page
router.get('/reset-password', (req, res) => {
    res.render('pages/auth/reset-password', {
        title: 'Reset Password',
        success_msg: '',
        error_msg: '',
        token: req.query.token || '',
        layout: false,
        pageCSS: 'auth/reset-password.css'
    });
});

// Success page
router.get('/success', (req, res) => {
    res.render('pages/auth/success', {
        title: 'Password Reset Success',
        success_msg: '',
        error_msg: '',
        layout: false,
        pageCSS: 'auth/success.css'
    });
});

module.exports = router; 