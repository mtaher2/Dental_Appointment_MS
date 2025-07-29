const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return this.phoneNumber || v; // Either email or phone must exist
            },
            message: 'Either email or phone number is required'
        }
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: function(v) {
                return this.email || v; // Either email or phone must exist
            },
            message: 'Either email or phone number is required'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    preferredLanguage: {
        type: String,
        enum: ['english', 'arabic'],
        default: 'english'
    },
    profilePhoto: {
        type: String,
        default: null
    },
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    otpCode: {
        type: String,
        select: false
    },
    otpExpires: {
        type: Date,
        select: false
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String
    },
    familyMembers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Patient'
    }],
    medicalHistory: {
        chronicIllnesses: [String],
        allergies: [String],
        medications: [String]
    },
    dentalHistory: {
        procedures: [String],
        treatments: [String],
        xrays: [String]
    },
    createdBy: {
        type: String,
        required: true
    },
    lastLogin: {
        date: Date,
        ipAddress: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Middleware to hash password before saving
patientSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    
    if (this.isModified('password') && !this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }
    next();
});

// Instance method to check if password is correct
patientSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password was changed after token was issued
patientSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// Instance method to create password reset token
patientSchema.methods.createPasswordResetToken = function() {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    this.otpCode = crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex');
    
    this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    return otp;
};

// Instance method to verify OTP
patientSchema.methods.verifyOTP = function(candidateOTP) {
    if (!this.otpCode || !this.otpExpires) return false;
    
    const hashedOTP = crypto
        .createHash('sha256')
        .update(candidateOTP)
        .digest('hex');
    
    if (this.otpExpires < Date.now()) return false;
    return this.otpCode === hashedOTP;
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient; 