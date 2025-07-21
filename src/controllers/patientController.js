const Patient = require('../models/Patient');
const ActivityLog = require('../models/ActivityLog');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { uploadFile, deleteFile } = require('../utils/fileUpload');

exports.getProfile = catchAsync(async (req, res, next) => {
    const patient = await Patient.findById(req.patient.id)
        .populate('familyMembers', 'fullName dateOfBirth gender');

    res.status(200).json({
        status: 'success',
        data: {
            patient
        }
    });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
    const allowedFields = ['fullName', 'gender', 'dateOfBirth', 'preferredLanguage'];
    const updateData = {};

    allowedFields.forEach(field => {
        if (req.body[field]) updateData[field] = req.body[field];
    });

    // Handle profile photo upload
    if (req.files && req.files.profilePhoto) {
        const file = req.files.profilePhoto;
        if (!file.mimetype.startsWith('image/')) {
            return next(new AppError('Please upload only images.', 400));
        }

        const filePath = await uploadFile(file, `patient-${req.patient.id}`);
        
        // Delete old profile photo if exists
        if (req.patient.profilePhoto) {
            await deleteFile(req.patient.profilePhoto);
        }
        
        updateData.profilePhoto = filePath;
    }

    const patient = await Patient.findByIdAndUpdate(
        req.patient.id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    // Log profile update
    await ActivityLog.create({
        patient: patient._id,
        action: 'profile_update',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        details: updateData
    });

    res.status(200).json({
        status: 'success',
        data: {
            patient
        }
    });
});

exports.addFamilyMember = catchAsync(async (req, res, next) => {
    const { relationship } = req.body;
    
    if (!['spouse', 'child'].includes(relationship)) {
        return next(new AppError('Only spouse and children can be added as family members.', 400));
    }

    // Check age for children
    if (relationship === 'child') {
        const birthDate = new Date(req.body.dateOfBirth);
        const age = (new Date().getFullYear()) - birthDate.getFullYear();
        
        if (age >= 21) {
            return next(new AppError('Children 21 and older must register their own account.', 400));
        }
    }

    // Create family member
    const familyMember = await Patient.create({
        ...req.body,
        createdBy: req.patient.id,
        // For children under 18 or aged 18-20, disable login
        active: relationship === 'child' ? false : true
    });

    // Add to patient's family members
    await Patient.findByIdAndUpdate(
        req.patient.id,
        { $push: { familyMembers: familyMember._id } }
    );

    res.status(201).json({
        status: 'success',
        data: {
            familyMember
        }
    });
});

exports.getFamilyMembers = catchAsync(async (req, res, next) => {
    const patient = await Patient.findById(req.patient.id)
        .populate('familyMembers', 'fullName dateOfBirth gender relationship');

    res.status(200).json({
        status: 'success',
        data: {
            familyMembers: patient.familyMembers
        }
    });
});

exports.updateEmergencyContact = catchAsync(async (req, res, next) => {
    // Validate required fields
    const { name, relationship, phoneNumber } = req.body;

    if (!name || !relationship || !phoneNumber) {
        return next(new AppError('Please provide name, relationship, and phone number for emergency contact', 400));
    }

    // Validate phone number format (must start with + and have 5-15 digits)
    if (!phoneNumber.startsWith('+') || !/^\+[1-9]\d{4,14}$/.test(phoneNumber)) {
        return next(new AppError('Phone number must start with + followed by 5-15 digits (e.g., +12345678901)', 400));
    }

    try {
        // First find the patient
        const patient = await Patient.findById(req.patient.id);
        
        if (!patient) {
            return next(new AppError('Patient not found', 404));
        }

        // Update emergency contact information
        patient.emergencyContact = {
            name,
            relationship,
            phoneNumber
        };

        // Save will run the validators
        await patient.save({ validateModifiedOnly: true });

        // Log emergency contact update
        await ActivityLog.create({
            patient: patient._id,
            action: 'emergency_contact_update',
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            details: { emergencyContact: { name, relationship, phoneNumber } }
        });

        res.status(200).json({
            status: 'success',
            data: {
                emergencyContact: patient.emergencyContact
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(new AppError(error.message, 400));
        }
        return next(error);
    }
});

exports.getActivityLog = catchAsync(async (req, res, next) => {
    const logs = await ActivityLog.find({ patient: req.patient.id })
        .sort('-timestamp')
        .limit(100);

    res.status(200).json({
        status: 'success',
        data: {
            logs
        }
    });
}); 