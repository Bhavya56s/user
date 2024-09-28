const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
      },
      package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package', // Reference to Package model
        required: true
      },
      plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan', // Reference to Package model
        required: true
      },
  
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  payment_method: { type: String, required: true }, // Fixed type to String
  current_date: { type: Date, default: Date.now, required: true } // Added default current date
});

module.exports = mongoose.model('subscriptions', SubscriptionSchema);
