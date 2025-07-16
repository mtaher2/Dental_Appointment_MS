const express = require('express');
const router = express.Router();

// GET /superadmin/master-logs
router.get('/', (req, res) => {
  res.render('pages/superAdmin/masterLogs', { page: 'superadmin-master-logs' });
});

module.exports = router; 