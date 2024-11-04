
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User Endpoint
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token and success message
        res.status(201).json({ token, message: 'Registration successful' });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login User Endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token, user id, and role
        res.status(200).json({ token, id: user._id, role: user.role, message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in user:', err.message);
        res.status(500).json({ error: 'Error logging in user' });
    }
});

// Fetch All Users for User Management Page
router.get('/users', async (req, res) => {
    try {
        // Retrieve user data, selecting only the necessary fields
        const users = await User.find({}, 'firstName lastName username email phone registrationDate lastLogin status');
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Edit User Endpoint
router.put('/users/:id', async (req, res) => {
    try {
        const { firstName, lastName, username, email, phone, status } = req.body;

        // Find and update the user by ID
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { firstName, lastName, username, email, phone, status },
            { new: true }
        );

        // Respond with the updated user information
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Deactivate User Endpoint
router.put('/users/:id/deactivate', async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Set the user's status to 'Deactivated'
        user.status = 'Deactivated';
        await user.save();

        // Respond with a success message
        res.status(200).json({ message: 'User deactivated successfully' });
    } catch (err) {
        console.error('Error deactivating user:', err.message);
        res.status(500).json({ error: 'Error deactivating user' });
    }
});


router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details
        res.json(user);
    } catch (err) {
        console.error('Error fetching user details:', err.message);
        res.status(500).json({ error: 'Error fetching user details' });
    }
});

module.exports = router;