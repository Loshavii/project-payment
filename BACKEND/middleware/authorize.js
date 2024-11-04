const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Coach = require('../models/Coach.js')



const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied. You do not have the necessary permissions.' });
        }

        next();
    };
};

module.exports = authorize;
