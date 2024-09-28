const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  tenure: { type: String, required: true },
  months: { type: Number, default: 0 },
  rate: { type: Number, required: true },
  
}, { collection: 'Plans' }); // Specify custom collection name here

module.exports = mongoose.model('Plans', planSchema);
