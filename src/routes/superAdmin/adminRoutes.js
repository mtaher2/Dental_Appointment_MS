const express = require('express');
const adminController = require('../../controllers/adminController');
const router = express.Router();

// For testing purposes, we'll skip admin authentication for now
router.post('/patients', adminController.createPatient);
router.get('/patients', adminController.getAllPatients);
router.get('/patients/:id', adminController.getPatient);
router.patch('/patients/:id', adminController.updatePatient);
router.delete('/patients/:id', adminController.deletePatient);

module.exports = router; 