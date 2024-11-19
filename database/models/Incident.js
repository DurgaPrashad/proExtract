const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low'],
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    relatedVulnerabilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vulnerability'
    }],
    vendor: {
        type: String,
        required: true
    },
    impactedSystems: [{
        type: String
    }],
    timeline: [{
        action: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        notes: String
    }],
    resolution: {
        date: Date,
        summary: String,
        mitigationSteps: [String]
    }
}, {
    timestamps: true
});

incidentSchema.index({ status: 1, severity: 1 });
incidentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Incident', incidentSchema);