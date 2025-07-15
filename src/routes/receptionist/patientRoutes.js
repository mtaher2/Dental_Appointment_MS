const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/receptionist/patientController');

// Main patient management page
router.get('/patients', patientController.getPatientManagement);

// Add Family Member page (specific routes first)
router.get('/family-members/add', patientController.getAddFamilyMember);
router.post('/family-members/add', patientController.postAddFamilyMember);

// Search patients (specific route before parameterized routes)
router.get('/patients/search', patientController.searchPatients);

// API routes for patient management (parameterized routes last)
router.get('/patients/:patientId', patientController.getPatientDetails);
router.put('/patients/:patientId', patientController.updatePatientInfo);
router.post('/patients/:patientId/family-members', patientController.addFamilyMember);
router.post('/patients/:patientId/documents', patientController.uploadDocument);
router.get('/patients/:patientId/family-members/:familyMemberId', patientController.viewFamilyMember);
router.get('/patients/:patientId/documents/:documentId', patientController.viewDocument);

module.exports = router; 