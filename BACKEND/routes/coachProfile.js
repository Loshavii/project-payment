
const express = require('express');
const router = express.Router();
const CoachProfile = require('../models/CoachProfile');

// POST request to save or update coach profile
router.post('/profile', async (req, res) => {
    const { email, fullName, nickName, gender, age, education, country, location, language, timeZone, bio, qualification, coachingStyle, availability } = req.body;

    // Validation to ensure required fields are present
    if (!email || !fullName) {
        return res.status(400).json({ message: 'Email and full name are required' });
    }

    try {
        // Find existing coach profile by email
        let coach = await CoachProfile.findOne({ email });

        // If profile exists, update it
        if (coach) {
            const updatedData = { 
                fullName, nickName, gender, age, education, country, location, language, timeZone, bio, qualification, coachingStyle, availability 
            };
            coach = await CoachProfile.findOneAndUpdate(
                { email },
                { $set: updatedData },  // Only update the fields that were passed
                { new: true }
            );
            return res.status(200).json(coach);
        }

        // If no profile exists, create a new one
        coach = new CoachProfile({ 
            email, fullName, nickName, gender, age, education, country, location, language, timeZone, bio, qualification, coachingStyle, availability 
        });
        await coach.save();
        
        res.status(201).json(coach);
    } catch (error) {
        console.error('Error saving/updating coach profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET request to fetch a coach profile by email
router.get('/profile/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const coach = await CoachProfile.findOne({ email });

        if (!coach) {
            return res.status(404).json({ message: 'Coach profile not found' });
        }

        res.status(200).json(coach);
    } catch (error) {
        console.error('Error fetching coach profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;




















































