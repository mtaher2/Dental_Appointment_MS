const express = require('express');
const router = express.Router();

// GET /superadmin/system-config
router.get('/', (req, res) => {
  res.render('pages/superAdmin/systemConfig', { page: 'superadmin-system-config' });
});

module.exports = router; 