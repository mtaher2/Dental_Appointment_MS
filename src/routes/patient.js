const express = require('express');
const router = express.Router();

// Payment Options
router.get('/payment', (req, res) => {
  res.render('pages/patient/paymentOptions', {
    title: 'Payment Options',
    pageCSS: 'patient/paymentOptions.css'
  });
});

// Payment History
router.get('/payment-history', (req, res) => {
  res.render('pages/patient/paymentHistory', {
    title: 'Payment History',
    pageCSS: 'patient/paymentHistory.css'
  });
});

// Invoices
router.get('/invoices', (req, res) => {
  res.render('pages/patient/invoices', {
    title: 'Invoices',
    pageCSS: 'patient/invoices.css'
  });
});

// My Health Record
router.get('/health-record', (req, res) => {
  res.render('pages/patient/healthRecord', {
    title: 'Health Record',
    pageCSS: 'patient/healthRecord.css'
  });
});

// Family Dashboard
router.get('/family-dashboard', (req, res) => {
  res.render('pages/patient/familyDashboard', {
    title: 'Family Dashboard',
    pageCSS: 'patient/familyDashboard.css'
  });
});

module.exports = router; 