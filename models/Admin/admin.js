const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email uniqueness
  },
  mobile_no: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_agree: {
    type: Boolean,
    required: true
  },
  user_image: {
    type: String // URL or path to the user image
  },
  time_zone: {
    type: String
  },
  time_formate: {
    type: String,
    default: '12-hour' // Default time format, can be '12-hour' or '24-hour'
  },
  date_formate: {
    type: String,
    default: 'MM/DD/YYYY' // Default date format
  },
  week_formate: {
    type: String,
    default: 'Sunday' // Can be 'Sunday' or 'Monday' to indicate the first day of the week
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Package model
    ref: 'Package'
  },
  company_name: {
    type: String
  },
  company_logo: {
    type: String // URL or path to the company logo
  },
  company_type: {
    type: String // e.g., 'Private', 'Public'
  },
  role_in_company: {
    type: String // e.g., 'Admin', 'Employee'
  }
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password in the database
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('Admin', userSchema);

module.exports = User;
