const express = require('express');
const router = express.Router();

// GET /superadmin/admins
router.get('/', (req, res) => {
  res.render('pages/superAdmin/admins', { page: 'superadmin-admins' });
});

module.exports = router; 