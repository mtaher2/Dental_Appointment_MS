const express = require('express');
const router = express.Router();

// GET /superadmin/dashboard
router.get('/', (req, res) => {
  res.render('pages/superAdmin/dashboard', { page: 'superadmin-dashboard' });
});

module.exports = router; 