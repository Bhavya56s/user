const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  packageNo: { type: String, required: true },
  numOfProjects: { type: Number, required: true },
  numOfEmployes: { type: Number, required: true }, // Renamed from noOfEmployes for correct spelling
  storageUnit: { type: Number, default: 0 }, // Default value of 0 for storage units
  storageUnitType: { type: String, default: 'GB' }, // Default value 'GB' for storage unit type
  planType: { type: String, required: true },
  packageStatus: { type: String, required: true, enum: ['Active', 'Hide'] }, // Enum for status
  numOfClients: { type: Number, required: true },
  plan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  description: { type: String, default: '' }, // Default empty string for description
  modules: [{ type: String, default: [] }] // Default empty array for modules
});

module.exports = mongoose.model('Package', PackageSchema);
