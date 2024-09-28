const path = require('path');
const Subscription = require('../../models/SuperAdmin/subscription');
const User = require('../../models/SuperAdmin/user'); // Import the User model
const Package = require('../../models/SuperAdmin/package'); // Import the Package model

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    // Create a new subscription
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();

    // Find the user by user_id
    const user = await User.findById(req.body.user_id);

    if (user) {
      // Check if the user already has a subscription ID
      if (!user.subscriptionIds) {
        // If no subscriptions exist, add the new subscription ID
        user.subscriptionIds = [newSubscription._id];
      } else if (!user.subscriptionIds.includes(newSubscription._id)) {
        // If the subscription doesn't already exist, add it
        user.subscriptionIds.push(newSubscription._id);
      }

      // Save the updated user
      await user.save();
      return res.status(200).send(user);
    } else {
      // If the user does not exist, create a new user record
      const newUser = new User({
        ...req.body, // Ensure req.body contains necessary user fields
        subscriptionIds: [newSubscription._id], // Set the new subscription ID
      });
      await newUser.save();
      return res.status(201).send(newUser);
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};



// Get all subscriptions
exports.getAllSubscription = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('user_id') // Populate user data
      .populate({
        path: 'package_id', // Populate package_id
        populate: {
          path: 'plan_id', // Populate plan_id from within the package
          model: 'Plans' // Ensure the correct model name is used here
        }
      });

    res.status(200).send(subscriptions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



// Get subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user_id').populate('package_id');
    if (!subscription) {
      return res.status(404).send({ message: 'Subscription not found' });
    }
    res.status(200).send(subscription);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update subscription by ID
exports.updateSubscriptionById = async (req, res) => {
  try {
    const updates = { ...req.body };
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).populate('user_id').populate('package_id');
    if (!subscription) {
      return res.status(404).send({ message: 'Subscription not found' });
    }
    res.status(200).send(subscription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete subscription by ID and remove subscription reference from user's data
exports.deleteSubscriptionById = async (req, res) => {
  try {
    // Find and delete the subscription by ID
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    
    if (!subscription) {
      return res.status(404).send({ message: 'Subscription not found' });
    }

    // Find the user by subscription's user ID and remove the subscription_id from their record
    await User.findByIdAndUpdate(subscription.user_id, {
      $unset: { subscription_id: 1 } // Remove the subscription_id field from the user document
    });

    res.status(200).send({ message: 'Subscription deleted and removed from user successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

