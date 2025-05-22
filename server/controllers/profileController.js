const Profile = require("../models/UserProfile");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProfile = async (req, res) => {
  const { name, dob, cycleLength, periodLength } = req.body;

  try {
    const existingProfile = await Profile.findOne({ userId: req.user.userId });

    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const newProfile = new Profile({
      userId: req.user.userId,
      name,
      dob,
      cycleLength,
      periodLength
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Create Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, dob, cycleLength, periodLength } = req.body;

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      { name, dob, cycleLength, periodLength },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
