const express = require('express');
const router = express.Router();

// GET /admin/reporting
router.get('/', (req, res) => {
  res.render('pages/admin/reporting', { page: 'admin-reporting' });
});

module.exports = router; 