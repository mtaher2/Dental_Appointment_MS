const express = require('express');
const router = express.Router();

// Invoice Management page route
router.get('/invoice-management', (req, res) => {
  res.render('pages/billing/invoiceManagement', {
    title: 'Invoice Management',
    user: req.user || null,
    pageCSS: 'billing/invoiceManagement.css'
  });
});

// Record Payment page route
router.get('/record-payment', (req, res) => {
  res.render('pages/billing/recordPayment', {
    title: 'Record Payment',
    user: req.user || null,
    pageCSS: 'billing/recordPayment.css'
  });
});

// Receipts & History page route
router.get('/receipts-history', (req, res) => {
  res.render('pages/billing/receiptsHistory', {
    title: 'Receipts & History',
    user: req.user || null,
    pageCSS: 'billing/receiptsHistory.css'
  });
});

// Apply Discount page route
router.get('/apply-discount', (req, res) => {
  res.render('pages/billing/applyDiscount', {
    title: 'Apply Discount',
    user: req.user || null,
    pageCSS: 'billing/applyDiscount.css'
  });
});

// Reports page route
router.get('/reports', (req, res) => {
  res.render('pages/billing/reports', {
    title: 'Reports',
    user: req.user || null,
    pageCSS: 'billing/reports.css'
  });
});

// Activity Log page route
router.get('/activity-log', (req, res) => {
  res.render('pages/billing/activityLog', {
    title: 'Billing Officer Activity Log',
    user: req.user || null,
    pageCSS: 'billing/activityLog.css'
  });
});

module.exports = router; 