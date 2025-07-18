const express = require('express');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/resetPassword', authController.resetPassword);

// Protected routes
router.use(authController.protect);

// Routes that don't require password change
router.patch('/updatePassword', authController.updatePassword);
router.post('/logout', authController.logout);

// Routes that require password change check
router.use(authController.enforcePasswordChange);

router.get('/profile', patientController.getProfile);
router.patch('/profile', patientController.updateProfile);

// Family member routes
router.get('/family', patientController.getFamilyMembers);
router.post('/family', patientController.addFamilyMember);

// Activity log
router.get('/activity', patientController.getActivityLog);

module.exports = router; 