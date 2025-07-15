const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'login',
            'logout',
            'password_reset',
            'password_update',
            'profile_update',
            'appointment_book',
            'appointment_cancel',
            'appointment_reschedule',
            'feedback_submit',
            'document_view',
            'payment_initiate',
            'payment_complete'
        ]
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: String,
    details: mongoose.Schema.Types.Mixed,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Index for better query performance
activityLogSchema.index({ patient: 1, timestamp: -1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog; 