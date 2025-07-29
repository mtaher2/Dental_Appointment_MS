const nodemailer = require('nodemailer');

class Email {
    constructor(patient, url, tempPassword = null, otp = null) {
        this.to = patient.email;
        this.firstName = patient.fullName.split(' ')[0];
        this.url = url;
        this.tempPassword = tempPassword;
        this.otp = otp;
        this.from = `Dental Clinic <${process.env.EMAIL_FROM}>`;
    }

    createTransport() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(template, subject) {
        // 1) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html: this.generateTemplate(template)
        };

        // 2) Create transport and send email
        await this.createTransport().sendMail(mailOptions);
    }

    generateTemplate(template) {
        switch (template) {
            case 'passwordReset':
                return `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1>Hello ${this.firstName},</h1>
                        <p>You requested to reset your password. Here is your One-Time Password (OTP):</p>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
                            <h2 style="color: #333; margin: 0; font-size: 32px; letter-spacing: 5px;">${this.otp}</h2>
                        </div>

                        <p><strong>Important:</strong></p>
                        <ul>
                            <li>This OTP is valid for 10 minutes only</li>
                            <li>If you didn't request this, please ignore this email</li>
                            <li>Never share your OTP with anyone</li>
                        </ul>
                        
                        <hr>
                        <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply.</p>
                    </div>
                `;
            case 'welcome':
                return `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1>Welcome ${this.firstName}!</h1>
                        <p>Thank you for joining our dental clinic. Your account has been created successfully.</p>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <h2 style="color: #333; margin-top: 0;">Your Login Credentials</h2>
                            <p><strong>Email:</strong> ${this.to}</p>
                            <p><strong>Temporary Password:</strong> ${this.tempPassword}</p>
                            <p style="color: #dc3545;"><strong>Important:</strong> You will be required to change this password on your first login.</p>
                        </div>

                        <a href="${this.url}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Login to Your Account</a>
                        
                        <div style="margin-top: 20px;">
                            <p><strong>For your security:</strong></p>
                            <ul>
                                <li>Change your password immediately upon first login</li>
                                <li>Never share your password with anyone</li>
                                <li>Use a strong password with a mix of letters, numbers, and symbols</li>
                            </ul>
                        </div>
                        
                        <hr>
                        <p style="color: #666; font-size: 12px;">If you didn't request this account, please contact our support team immediately.</p>
                    </div>
                `;
            default:
                return '';
        }
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Password Reset - Your OTP Code');
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to Dental Clinic - Your Account Details');
    }
}

module.exports = Email; 