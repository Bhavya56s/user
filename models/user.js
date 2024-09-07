const mongoose = require('mongoose');


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
    type: Number,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  dateofJoining:{
    type:Date,
    required:true
  },
  gender:{
    type:String,
    enum:['Gender','Male'],
    required:true
  },
  address:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  zipCode:{
    type:String,
    required:true
  },
  country :{
    type:String,
    required:true
  },
  password :{
    type:String,
    required:true
  },
  confirmPassword :{
    type:String,
    required:true
  }

});


const User = mongoose.model('User', userSchema);

module.exports = User;
