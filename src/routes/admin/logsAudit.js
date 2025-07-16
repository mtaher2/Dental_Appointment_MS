const express = require('express');
const router = express.Router();

// GET /admin/logs-audit
router.get('/', (req, res) => {
  res.render('pages/admin/logsAudit', { page: 'admin-logs-audit' });
});

module.exports = router; 