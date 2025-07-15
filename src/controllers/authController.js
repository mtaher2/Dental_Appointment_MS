const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const Patient = require('../models/Patient');
const ActivityLog = require('../models/ActivityLog');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (patient, statusCode, req, res) => {
    const token = signToken(patient._id);
    
    // Remove password from output
    patient.password = undefined;
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            patient
        }
    });
};

exports.login = catchAsync(async (req, res, next) => {
    const { email, phoneNumber, password } = req.body;

    // 1) Check if email/phone and password exist
    if ((!email && !phoneNumber) || !password) {
        return next(new AppError('Please provide email/phone and password!', 400));
    }

    // 2) Check if patient exists && password is correct
    const patient = await Patient.findOne({
        $or: [{ email }, { phoneNumber }]
    }).select('+password');

    if (!patient || !(await patient.correctPassword(password, patient.password))) {
        return next(new AppError('Incorrect email/phone or password', 401));
    }

    // 3) Log the login activity
    await ActivityLog.create({
        patient: patient._id,
        action: 'login',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
    });

    // 4) Update last login
    patient.lastLogin = {
        date: Date.now(),
        ipAddress: req.ip
    };
    await patient.save({ validateBeforeSave: false });

    // 5) If everything ok, send token to client
    createSendToken(patient, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if patient still exists
    const currentPatient = await Patient.findById(decoded.id);
    if (!currentPatient) {
        return next(new AppError('The patient belonging to this token no longer exists.', 401));
    }

    // 4) Check if patient changed password after the token was issued
    if (currentPatient.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('Patient recently changed password! Please log in again.', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.patient = currentPatient;
    next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get patient based on POSTed email
    const patient = await Patient.findOne({ email: req.body.email });
    if (!patient) {
        return next(new AppError('There is no patient with that email address.', 404));
    }

    // 2) Generate OTP
    const otp = patient.createPasswordResetToken();
    await patient.save({ validateBeforeSave: false });

    try {
        // 3) Send OTP to patient's email
        await new Email(patient, '', null, otp).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'OTP sent to email!'
        });
    } catch (err) {
        patient.otpCode = undefined;
        patient.otpExpires = undefined;
        await patient.save({ validateBeforeSave: false });

        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
    const { email, otp } = req.body;

    // 1) Get patient based on email
    const patient = await Patient.findOne({ email }).select('+otpCode +otpExpires');
    
    if (!patient) {
        return next(new AppError('Invalid email address.', 404));
    }

    // 2) Verify OTP
    if (!patient.verifyOTP(otp)) {
        return next(new AppError('Invalid or expired OTP.', 400));
    }

    // 3) If OTP is valid, allow password reset
    res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully!'
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { email, otp, newPassword, passwordConfirm } = req.body;

    // 1) Check if passwords match
    if (newPassword !== passwordConfirm) {
        return next(new AppError('Passwords do not match.', 400));
    }

    // 2) Get patient and verify OTP
    const patient = await Patient.findOne({ email }).select('+otpCode +otpExpires');
    
    if (!patient || !patient.verifyOTP(otp)) {
        return next(new AppError('Invalid or expired OTP.', 400));
    }

    // 3) Set the new password
    patient.password = newPassword;
    patient.otpCode = undefined;
    patient.otpExpires = undefined;
    patient.isFirstLogin = false;

    await patient.save();

    // 4) Log the password reset
    await ActivityLog.create({
        patient: patient._id,
        action: 'password_reset',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
    });

    // 5) Log in the patient, send JWT
    createSendToken(patient, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get patient from collection
    const patient = await Patient.findById(req.patient.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (!(await patient.correctPassword(req.body.currentPassword, patient.password))) {
        return next(new AppError('Your current password is wrong.', 401));
    }

    // 3) If so, update password
    patient.password = req.body.password;
    await patient.save();

    // 4) Log the password update
    await ActivityLog.create({
        patient: patient._id,
        action: 'password_update',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
    });

    // 5) Log in patient, send JWT
    createSendToken(patient, 200, req, res);
}); 