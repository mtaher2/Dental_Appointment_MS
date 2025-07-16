const express = require('express');
const router = express.Router();

// Super Admin Dashboard page route
router.get('/dashboard', (req, res) => {
  res.render('pages/superAdmin/dashboard', {
    title: 'Super Admin Dashboard',
    user: req.user || null
  });
});

// Super Admin System Configuration page route
router.get('/system-config', (req, res) => {
  res.render('pages/superAdmin/systemConfig', {
    title: 'System Configuration',
    user: req.user || null
  });
});

// Super Admin Developer Tools page route
router.get('/dev-tools', (req, res) => {
  res.render('pages/superAdmin/devTools', {
    title: 'Developer Tools',
    user: req.user || null
  });
});

// Super Admin Master Logs & Audit page route
router.get('/master-logs', (req, res) => {
  res.render('pages/superAdmin/masterLogs', {
    title: 'Master Logs & Audit',
    user: req.user || null
  });
});

// Super Admin Admins page route
router.get('/admins', (req, res) => {
  res.render('pages/superAdmin/admins', {
    title: 'Admins',
    user: req.user || null
  });
});

module.exports = router; 