const express = require('express');
const router = express.Router();

// GET /admin/clinic-configuration
router.get('/', (req, res) => {
  res.render('pages/admin/clinicConfig', { page: 'admin-clinic-config' });
});

module.exports = router; 