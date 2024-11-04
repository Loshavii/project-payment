// backend/models/Coach.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const coachSchema = new mongoose.Schema({
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String }, // Example additional field for coach specialization
    experience: { type: Number }, // Years of experience
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    registrationDate: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'user', 'coach'], default: 'coach' }, // User role
    // Add more coach-specific fields as needed
}, { timestamps: true });


// Create the Coach model from the schema
const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach; // Export the Coach model
