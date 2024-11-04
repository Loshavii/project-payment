// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate'); // Authentication middleware

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'coach'], default: 'user' },

    // Remove role field
},{ timestamps: true });



const User = mongoose.model('User', userSchema);

module.exports = User;

