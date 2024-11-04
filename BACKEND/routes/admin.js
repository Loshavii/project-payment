
const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const User = require('../models/User');

// Middleware for admin authentication
const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// Fetch all pending coaches
router.get('/coaches/pending', adminAuth, async (req, res) => {
    try {
        const pendingCoaches = await Coach.find({ status: 'pending' });
        res.status(200).json(pendingCoaches);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pending coaches' });
    }
});

// Fetch all approved coaches
router.get('/coaches/approved', adminAuth, async (req, res) => {
    try {
        const approvedCoaches = await Coach.find({ status: 'approved' });
        res.status(200).json(approvedCoaches);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching approved coaches' });
    }
});

// Fetch all rejected coaches
router.get('/coaches/rejected', adminAuth, async (req, res) => {
    try {
        const rejectedCoaches = await Coach.find({ status: 'rejected' });
        res.status(200).json(rejectedCoaches);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching rejected coaches' });
    }
});

// Approve or reject a coach
router.put('/coaches/:id/approve', adminAuth, async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        coach.status = req.body.status; // 'approved' or 'rejected'
        await coach.save();

        res.status(200).json({ message: `Coach ${coach.status} successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error updating coach status' });
    }
});

// Fetch all users
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Fetch a single coach by ID
router.get('/coaches/:id', adminAuth, async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        res.status(200).json(coach);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching coach' });
    }
});

// Fetch a single user by ID
router.get('/users/:id', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

// Deactivate a user by ID
router.put('/users/:id/deactivate', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.active = false;
        await user.save();

        res.status(200).json({ message: 'User deactivated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deactivating user' });
    }
});

// Activate a user by ID
router.put('/users/:id/activate', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.active = true;
        await user.save();

        res.status(200).json({ message: 'User activated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error activating user' });
    }
});

module.exports = router;


