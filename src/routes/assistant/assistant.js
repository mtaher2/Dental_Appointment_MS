const express = require('express');
const router = express.Router();

// Internal Communication route
router.get('/internal-communication', (req, res) => {
  res.render('pages/assistant/internal-communication', {
    title: 'Internal Communication',
    user: req.user || null,
    layout: false
  });
});

// Threads route
router.get('/threads', (req, res) => {
  res.render('pages/assistant/threads', {
    title: 'Threads',
    user: req.user || null,
    layout: false
  });
});

// Activity Log route
router.get('/activity-log', (req, res) => {
  res.render('pages/assistant/activity-log', {
    title: 'Activity Log',
    user: req.user || null,
    layout: false
  });
});

// Navigation Buttons Demo route
router.get('/nav-buttons-demo', (req, res) => {
  res.render('pages/assistant/nav-buttons-demo', {
    title: 'Navigation Buttons Demo',
    user: req.user || null,
    layout: false
  });
});

module.exports = router; 