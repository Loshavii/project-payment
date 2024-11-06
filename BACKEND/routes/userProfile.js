const express = require('express');
const UserProfile = require('../models/UserProfile');
const router = express.Router();
const coachesProfile = require('../models/CoachProfile');

// Route to create a new user profile
// router.post('/', async (req, res) => {
//     try {
//         const newUserProfile = new UserProfile(req.body);
//         await newUserProfile.save();
//         res.status(201).json(newUserProfile);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });


router.post('/', async (req, res) => {
    try {
        // Make sure status defaults to "pending" if not provided
        const userProfileData = {
            ...req.body,
            status: req.body.status || 'pending',  // Default status to "pending"
        };

        // Create a new UserProfile instance with the profile data
        const newUserProfile = new UserProfile(userProfileData);

        // Save the new profile to the database
        await newUserProfile.save();

        // Return the newly created profile with a 201 status (Created)
        res.status(201).json(newUserProfile);
    } catch (error) {
        // Check if the error is a validation error (e.g., missing required fields)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error: ' + error.message });
        }

        // Generic error handling for other issues
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});


  router.get('/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const userProfileData = await UserProfile.findOne({ email: email }); // Find profile by email
      if (!userProfileData) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(userProfileData);
    } catch (error) {
      console.error('Error fetching profile by email:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  // Route to get all profiles by coachEmail
router.get('/coach/:coachEmail', async (req, res) => {
    try {
      const coachEmail = req.params.coachEmail;
      
      // Find all profiles with the specified coachEmail
      const profiles = await UserProfile.find({ coachEmail: coachEmail });
  
      if (profiles.length === 0) {
        return res.status(404).json({ message: 'No profiles found for this coach' });
      }
  
      res.json(profiles);
    } catch (error) {
      console.error('Error fetching profiles by coachEmail:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

// Route to get all user profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await UserProfile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to update a user profile by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a user profile by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to get all pending user profiles for approval
router.get('/pending', async (req, res) => {
    try {
        const pendingProfiles = await UserProfile.find({ approvalStatus: 'pending' });
        res.status(200).json(pendingProfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




router.put('/:id/approve', async (req, res) => {
    try {
      const updatedProfile = await UserProfile.findByIdAndUpdate(
        req.params.id,
        { status: 'approved' },
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.json(updatedProfile);
    } catch (error) {
      console.error('Error approving profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route to decline a user profile

router.put('/:id/decline', async (req, res) => {
    try {
        const profile = await UserProfile.findByIdAndUpdate(
            req.params.id,
            { status: 'declined' },  // Update the status field
            { new: true }
        );
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile declined', profile });
    } catch (error) {
        console.error('Error declining profile:', error);
        res.status(500).json({ error: error.message });
    }
});





module.exports = router;