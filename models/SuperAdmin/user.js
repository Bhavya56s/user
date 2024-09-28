const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const saltRounds = 10; // You can adjust this value for security

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,  // Changed to String to accommodate phone number formats
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'] // Basic email validation
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Female', 'Male'],  // Enum values for gender
    required: true
  },
  address: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,  // Store the path of the uploaded image
    required: false
  },
  role: {
    type: String,
    default: 'admin' // Default value set to 'admin'
  },
  status: {
    type: String,
    default: 'Inactive' // Default value set to 'inactive'
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscriptions', // Ensure this matches the model name
    default: null
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Packages', // Reference to the Package model
    required: true
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plans', // Reference to the Plan model
    required: true
  },
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
