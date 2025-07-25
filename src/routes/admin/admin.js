const express = require('express');
const router = express.Router();

// Admin User Management page route
router.get('/user-management', (req, res) => {
  res.render('pages/admin/userManagement', {
    title: 'User Management',
    user: req.user || null
  });
});

// Admin Clinic Configuration page route
router.get('/clinic-configuration', (req, res) => {
  res.render('pages/admin/clinicConfig', {
    title: 'Clinic Configuration',
    user: req.user || null
  });
});

// Admin Notification Settings page route
router.get('/notification-settings', (req, res) => {
  res.render('pages/admin/notificationSettings', {
    title: 'Notification Settings',
    user: req.user || null
  });
});

// Admin Logs & Audit page route
router.get('/logs-audit', (req, res) => {
  res.render('pages/admin/logsAudit', {
    title: 'Logs & Audit',
    user: req.user || null
  });
});

// Admin Reporting page route
router.get('/reporting', (req, res) => {
  res.render('pages/admin/reporting', {
    title: 'Reporting',
    user: req.user || null
  });
});


module.exports = router; 