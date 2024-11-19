const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'researcher', 'analyst', 'viewer'],
        default: 'viewer'
    },
    department: {
        type: String,
        trim: true
    },
    notifications: {
        email: {
            type: Boolean,
            default: true
        },
        slack: {
            type: Boolean,
            default: false
        }
    },
    specializations: [{
        type: String
    }],
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);