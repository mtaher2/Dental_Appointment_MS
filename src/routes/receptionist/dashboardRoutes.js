const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/receptionist/dashboardController');

// GET - Receptionist Dashboard
router.get('/dashboard', dashboardController.getDashboard);

// POST - Check in patient
router.post('/check-in', dashboardController.checkInPatient);

// POST - Rebook appointment
router.post('/rebook', dashboardController.rebookAppointment);

// POST - Add reason for missed appointment
router.post('/add-reason', dashboardController.addReason);

// POST - Tag patient
router.post('/tag-patient', dashboardController.tagPatient);

module.exports = router; 