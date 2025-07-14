const express = require('express');
const router = express.Router();

// Payment Options
router.get('/payment', (req, res) => {
  res.render('pages/patient/paymentOptions');
});

// Payment History
router.get('/payment-history', (req, res) => {
  res.render('pages/patient/paymentHistory');
});

// Invoices
router.get('/invoices', (req, res) => {
  res.render('pages/patient/invoices');
});

// My Health Record
router.get('/health-record', (req, res) => {
  res.render('pages/patient/healthRecord');
});

// Family Dashboard
router.get('/family-dashboard', (req, res) => {
  res.render('pages/patient/familyDashboard');
});

module.exports = router; 