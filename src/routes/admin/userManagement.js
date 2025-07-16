const express = require('express');
const router = express.Router();

// GET /admin/user-management
router.get('/', (req, res) => {
  res.render('pages/admin/userManagement', { page: 'admin-user-management' });
});

module.exports = router; 