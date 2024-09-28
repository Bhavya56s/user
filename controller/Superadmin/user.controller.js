const multer = require('multer');
const path = require('path');
const User = require('../../models/SuperAdmin/user');
const subscription = require('../../models/SuperAdmin/subscription');
const Package = require('../../models/SuperAdmin/package');
const Plan = require('../../models/SuperAdmin/plan');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images only (jpeg, jpg, png)!'));
    }
  }
});

// Create user with image upload
exports.createUser = async (req, res) => {
  try {
    const imageName = req.file ? req.file.filename : null;

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const user = new User({
      ...req.body,
      image: imageName
    });

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get all users with subscription data
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users with their subscriptions
    const users = await User.find().populate('subscription_id');
    
    // Iterate over users to populate package and plan details
    const detailedUsers = await Promise.all(users.map(async (user) => {
      const subscription = user.subscription_id;
      if (!subscription) return user; // If no subscription, return user as is

      // Fetch package and plan details
      const packageDetails = await Package.findById(subscription.package_id);
      const planDetails = await Plan.findById(subscription.plan_id);
      
      // Combine subscription, package, and plan details
      return {
        ...user.toObject(),
        subscription: {
          ...subscription.toObject(),
          package: packageDetails ? packageDetails.toObject() : null,
          plan: planDetails ? planDetails.toObject() : null
        }
      };
    }));

    res.status(200).send(detailedUsers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get user by ID with subscription data
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('subscription_id');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.image = req.file.filename;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
