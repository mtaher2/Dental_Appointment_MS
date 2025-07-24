const express = require('express');
const Email = require('../utils/email');
const router = express.Router();

// Sample patient data for preview
const samplePatient = {
    email: 'john.doe@example.com',
    fullName: 'John Doe'
};

// Main email preview page
router.get('/', (req, res) => {
    try {
        // Generate welcome email HTML
        const welcomeEmail = new Email(samplePatient, `${req.protocol}://${req.get('host')}/login`, 'TempPass123');
        const welcomeEmailHtml = welcomeEmail.generateTemplate('welcome');

        // Generate OTP email HTML
        const otpEmail = new Email(samplePatient, '', null, '123456');
        const otpEmailHtml = otpEmail.generateTemplate('passwordReset');

        res.render('pages/emailPreview', {
            title: 'Email Templates Preview',
            welcomeEmailHtml,
            otpEmailHtml,
            success_msg: '',
            error_msg: ''
        });
    } catch (error) {
        console.error('Error rendering email preview:', error);
        res.status(500).render('pages/emailPreview', {
            title: 'Email Templates Preview - Error',
            welcomeEmailHtml: '<p style="color: red;">Error loading welcome email template</p>',
            otpEmailHtml: '<p style="color: red;">Error loading OTP email template</p>',
            success_msg: '',
            error_msg: 'Error loading email templates: ' + error.message
        });
    }
});

// Individual welcome email preview
router.get('/welcome', (req, res) => {
    try {
        const email = new Email(samplePatient, `${req.protocol}://${req.get('host')}/login`, 'TempPass123');
        const htmlContent = email.generateTemplate('welcome');
        res.send(htmlContent);
    } catch (error) {
        console.error('Error rendering welcome email:', error);
        res.status(500).send(`<h1>Error</h1><p>${error.message}</p>`);
    }
});

// Individual OTP email preview
router.get('/otp', (req, res) => {
    try {
        const email = new Email(samplePatient, '', null, '123456');
        const htmlContent = email.generateTemplate('passwordReset');
        res.send(htmlContent);
    } catch (error) {
        console.error('Error rendering OTP email:', error);
        res.status(500).send(`<h1>Error</h1><p>${error.message}</p>`);
    }
});

// Test email sending (if you want to test actual email functionality)
router.post('/test-send', async (req, res) => {
    try {
        const { type, email: recipientEmail } = req.body;
        
        if (!recipientEmail) {
            return res.status(400).json({ error: 'Email address required' });
        }

        const testPatient = {
            email: recipientEmail,
            fullName: 'Test User'
        };

        const email = new Email(testPatient, `${req.protocol}://${req.get('host')}/login`, 'TestPass123', '123456');

        if (type === 'welcome') {
            await email.sendWelcome();
        } else if (type === 'otp') {
            await email.sendPasswordReset();
        } else {
            return res.status(400).json({ error: 'Invalid email type' });
        }

        res.json({ success: true, message: `${type} email sent successfully to ${recipientEmail}` });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ error: 'Failed to send email: ' + error.message });
    }
});

module.exports = router; 