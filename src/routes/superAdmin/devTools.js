const express = require('express');
const router = express.Router();

// GET /superadmin/dev-tools
router.get('/', (req, res) => {
  res.render('pages/superAdmin/devTools', { page: 'superadmin-dev-tools' });
});

module.exports = router; 