const express = require('express');
const router = express.Router();

// Assistant Dashboard page route
router.get('/', (req, res) => {
  res.render('pages/assistant/dashboard', {
    title: 'Assistant Dashboard',
    user: req.user || null,
    currentPage: 'dashboard',
    layout: false
  });
});

// Today's Tasks route
router.get('/todays-tasks', (req, res) => {
  res.render('pages/assistant/todays-tasks', {
    title: 'Today\'s Tasks',
    user: req.user || null,
    currentPage: 'todays-tasks',
    layout: false
  });
});

// Vital Signs route
router.get('/vital-signs', (req, res) => {
  res.render('pages/assistant/vital-signs', {
    title: 'Vital Signs',
    user: req.user || null,
    currentPage: 'vital-signs',
    layout: false
  });
});

// Upload Records route
router.get('/upload-records', (req, res) => {
  res.render('pages/assistant/upload-records', {
    title: 'Upload Records',
    user: req.user || null,
    currentPage: 'upload-records',
    layout: false
  });
});

// Settings route
router.get('/settings', (req, res) => {
  res.render('pages/assistant/settings', {
    title: 'Settings',
    user: req.user || null,
    currentPage: 'settings',
    layout: false
  });
});

// Assigned Patients route
router.get('/assigned-patients', (req, res) => {
  res.render('pages/assistant/assigned-patients', {
    title: 'Assigned Patients',
    user: req.user || null,
    currentPage: 'assigned-patients',
    layout: false
  });
});

// Patient History route
router.get('/patient-history', (req, res) => {
  res.render('pages/assistant/patient-history', {
    title: 'Patient History',
    user: req.user || null,
    currentPage: 'patient-history',
    layout: false
  });
});

module.exports = router; 