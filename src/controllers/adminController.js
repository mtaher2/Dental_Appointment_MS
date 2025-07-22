const Patient = require('../models/Patient');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

exports.createPatient = catchAsync(async (req, res, next) => {
    // 1) Check if email is provided
    if (!req.body.email) {
        return next(new AppError('Email is required for sending login credentials', 400));
    }

    // 2) Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    
    // 3) Create patient with temporary password
    const newPatient = await Patient.create({
        ...req.body,
        password: tempPassword,
        isFirstLogin: true,
        createdBy: 'admin' // Temporary for testing
    });

    try {
        // 4) Send welcome email with temporary password
        const loginURL = `${req.protocol}://${req.get('host')}/login`;
        await new Email(newPatient, loginURL, tempPassword).sendWelcome();

        // 5) Remove password from output
        newPatient.password = undefined;

        res.status(201).json({
            status: 'success',
            message: 'Patient created successfully. Login credentials sent to email.',
            data: {
                patient: newPatient
            }
        });
    } catch (error) {
        // If email fails, delete the created patient
        await Patient.findByIdAndDelete(newPatient._id);
        return next(new AppError('Error sending welcome email. Patient not created. Please try again.', 500));
    }
});

exports.getAllPatients = catchAsync(async (req, res, next) => {
    const patients = await Patient.find()
        .select('-password')
        .sort('-createdAt');

    res.status(200).json({
        status: 'success',
        results: patients.length,
        data: {
            patients
        }
    });
});

exports.getPatient = catchAsync(async (req, res, next) => {
    const patient = await Patient.findById(req.params.id)
        .select('-password');

    if (!patient) {
        return next(new AppError('No patient found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            patient
        }
    });
});

exports.updatePatient = catchAsync(async (req, res, next) => {
    // Prevent password update through this route
    if (req.body.password) {
        delete req.body.password;
    }

    const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    ).select('-password');

    if (!patient) {
        return next(new AppError('No patient found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            patient
        }
    });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
        return next(new AppError('No patient found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}); 