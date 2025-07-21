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
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Password Reset - OTP Code</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f6f7fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                            <!-- Header -->
                            <div style="background: linear-gradient(135deg, #6c63ff 0%, #4b61b8 100%); padding: 40px 32px; text-align: center;">
                                <h1 style="color: #ffffff; font-size: 1.5rem; font-weight: 700; margin: 0; letter-spacing: 0.5px;">
                                    🦷 Dental Clinic
                                </h1>
                            </div>
                            
                            <!-- Main Content -->
                            <div style="padding: 48px 32px 32px 32px; background-color: #ffffff;">
                                <div style="text-align: center; margin-bottom: 32px;">
                                    <div style="width: 64px; height: 64px; background: #f4f6fa; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                                        <span style="font-size: 28px;">🔐</span>
                                    </div>
                                    <h2 style="color: #222; font-size: 1.8rem; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">
                                        Password Reset Request
                                    </h2>
                                    <p style="color: #888; font-size: 1.05rem; margin: 0;">
                                        Hello ${this.firstName}, we received a request to reset your password
                                    </p>
                                </div>

                                <div style="background: linear-gradient(135deg, #f4f6fa 0%, #fafaff 100%); border: 2px solid #6c63ff; border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0;">
                                    <p style="color: #4b61b8; font-size: 1rem; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">
                                        Your One-Time Password
                                    </p>
                                    <div style="background: #ffffff; border-radius: 12px; padding: 24px; margin: 16px 0; box-shadow: 0 2px 12px 0 rgba(80, 80, 120, 0.10);">
                                        <h3 style="color: #6c63ff; margin: 0; font-size: 2.5rem; font-weight: 800; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                            ${this.otp}
                                        </h3>
                                    </div>
                                    <p style="color: #666; font-size: 0.95rem; margin: 16px 0 0 0;">
                                        <strong>⏰ Valid for 10 minutes only</strong>
                                    </p>
                                </div>

                                <!-- Security Tips -->
                                <div style="background: #fff8f0; border-left: 4px solid #f5a623; border-radius: 8px; padding: 24px; margin: 32px 0;">
                                    <h4 style="color: #f5a623; font-size: 1.1rem; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center;">
                                        <span style="margin-right: 8px;">⚠️</span>
                                        Security Reminders
                                    </h4>
                                    <ul style="color: #666; font-size: 1rem; margin: 0; padding-left: 20px; line-height: 1.6;">
                                        <li style="margin-bottom: 8px;">Never share your OTP with anyone</li>
                                        <li style="margin-bottom: 8px;">This code expires in 10 minutes</li>
                                        <li style="margin-bottom: 0;">If you didn't request this, please contact our support team</li>
                                    </ul>
                                </div>

                                <div style="text-align: center; margin-top: 40px;">
                                    <p style="color: #888; font-size: 0.95rem; margin: 0;">
                                        Need help? Contact our support team at 
                                        <a href="mailto:support@dentalclinic.com" style="color: #6c63ff; text-decoration: none; font-weight: 600;">support@dentalclinic.com</a>
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Footer -->
                            <div style="background-color: #f4f6fa; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                                <p style="color: #888; font-size: 0.9rem; margin: 0 0 8px 0;">
                                    This is an automated message from Dental Clinic
                                </p>
                                <p style="color: #bbb; font-size: 0.85rem; margin: 0;">
                                    Please do not reply to this email
                                </p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;
            case 'welcome':
                return `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Welcome to Dental Clinic</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f6f7fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                            <!-- Header -->
                            <div style="background: linear-gradient(135deg, #6c63ff 0%, #4b61b8 100%); padding: 40px 32px; text-align: center;">
                                <h1 style="color: #ffffff; font-size: 1.5rem; font-weight: 700; margin: 0; letter-spacing: 0.5px;">
                                    🦷 Dental Clinic
                                </h1>
                            </div>
                            
                            <!-- Main Content -->
                            <div style="padding: 48px 32px 32px 32px; background-color: #ffffff;">
                                <div style="text-align: center; margin-bottom: 32px;">
                                    <div style="width: 64px; height: 64px; background: #f4f6fa; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                                        <span style="font-size: 28px;">👋</span>
                                    </div>
                                    <h2 style="color: #222; font-size: 2rem; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">
                                        Welcome ${this.firstName}!
                                    </h2>
                                    <p style="color: #888; font-size: 1.1rem; margin: 0;">
                                        Your account has been created successfully. We're excited to have you with us!
                                    </p>
                                </div>

                                <!-- Login Credentials Card -->
                                <div style="background: linear-gradient(135deg, #f4f6fa 0%, #fafaff 100%); border: 2px solid #6c63ff; border-radius: 16px; padding: 32px; margin: 32px 0;">
                                    <div style="text-align: center; margin-bottom: 24px;">
                                        <h3 style="color: #4b61b8; font-size: 1.3rem; font-weight: 700; margin: 0; display: flex; align-items: center; justify-content: center;">
                                            <span style="margin-right: 8px;">🔑</span>
                                            Your Login Credentials
                                        </h3>
                                    </div>
                                    
                                    <div style="background: #ffffff; border-radius: 12px; padding: 24px; margin: 16px 0; box-shadow: 0 2px 12px 0 rgba(80, 80, 120, 0.10);">
                                        <div style="margin-bottom: 16px;">
                                            <label style="color: #6c63ff; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
                                                Email Address
                                            </label>
                                            <p style="color: #222; font-size: 1.1rem; font-weight: 600; margin: 0; font-family: 'Courier New', monospace; background: #f9f9fb; padding: 8px 12px; border-radius: 6px;">
                                                ${this.to}
                                            </p>
                                        </div>
                                        
                                        <div style="margin-bottom: 16px;">
                                            <label style="color: #6c63ff; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
                                                Temporary Password
                                            </label>
                                            <p style="color: #222; font-size: 1.1rem; font-weight: 600; margin: 0; font-family: 'Courier New', monospace; background: #f9f9fb; padding: 8px 12px; border-radius: 6px;">
                                                ${this.tempPassword}
                                            </p>
                                        </div>
                                        
                                        <div style="background: #fff8f0; border: 1px solid #f5a623; border-radius: 8px; padding: 16px; margin-top: 16px;">
                                            <p style="color: #f5a623; font-size: 0.95rem; font-weight: 600; margin: 0; display: flex; align-items: center;">
                                                <span style="margin-right: 6px;">⚠️</span>
                                                You must change this password on your first login
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Call to Action -->
                                <div style="text-align: center; margin: 40px 0 32px 0;">
                                    <a href="${this.url}" style="display: inline-block; background: linear-gradient(135deg, #6c63ff 0%, #4b61b8 100%); color: #ffffff; text-decoration: none; font-size: 1.1rem; font-weight: 700; padding: 16px 32px; border-radius: 12px; box-shadow: 0 4px 16px 0 rgba(108, 99, 255, 0.25); transition: transform 0.2s;">
                                        🚀 Access Your Account
                                    </a>
                                </div>

                                <!-- Security Best Practices -->
                                <div style="background: #f0f9ff; border-left: 4px solid #6c63ff; border-radius: 8px; padding: 24px; margin: 32px 0;">
                                    <h4 style="color: #4b61b8; font-size: 1.1rem; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center;">
                                        <span style="margin-right: 8px;">🛡️</span>
                                        Security Best Practices
                                    </h4>
                                    <ul style="color: #666; font-size: 1rem; margin: 0; padding-left: 20px; line-height: 1.6;">
                                        <li style="margin-bottom: 8px;">Change your password immediately upon first login</li>
                                        <li style="margin-bottom: 8px;">Use a strong password with letters, numbers, and symbols</li>
                                        <li style="margin-bottom: 8px;">Never share your login credentials with anyone</li>
                                        <li style="margin-bottom: 0;">Enable two-factor authentication when available</li>
                                    </ul>
                                </div>

                                <!-- Support Information -->
                                <div style="text-align: center; margin-top: 40px;">
                                    <h4 style="color: #222; font-size: 1.1rem; font-weight: 700; margin: 0 0 16px 0;">
                                        Need Help Getting Started?
                                    </h4>
                                    <p style="color: #888; font-size: 1rem; margin: 0 0 16px 0; line-height: 1.6;">
                                        Our support team is here to help you every step of the way.<br>
                                        Contact us at <a href="mailto:support@dentalclinic.com" style="color: #6c63ff; text-decoration: none; font-weight: 600;">support@dentalclinic.com</a>
                                    </p>
                                    <p style="color: #6c63ff; font-size: 0.9rem; font-weight: 600; margin: 0;">
                                        📞 Support Hours: Monday - Friday, 9:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Footer -->
                            <div style="background-color: #f4f6fa; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                                <p style="color: #888; font-size: 0.9rem; margin: 0 0 8px 0;">
                                    Welcome to Dental Clinic - Your oral health is our priority
                                </p>
                                <p style="color: #bbb; font-size: 0.85rem; margin: 0;">
                                    If you didn't request this account, please contact our support team immediately
                                </p>
                            </div>
                        </div>
                    </body>
                    </html>
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