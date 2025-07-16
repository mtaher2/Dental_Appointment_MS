const express = require('express');
const router = express.Router();

// GET /admin/notification-settings
router.get('/', (req, res) => {
  res.render('pages/admin/notificationSettings', { page: 'admin-notification-settings' });
});

module.exports = router; 