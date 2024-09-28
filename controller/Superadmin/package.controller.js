const Package = require('../../models/SuperAdmin/package');
const Plan = require('../../models/SuperAdmin/plan'); // Import the Plan model

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).send(newPackage);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update an existing package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).send({ message: 'Package not found' });
    }

    res.status(200).send(updatedPackage);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a package
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the package to get the associated plan_id
    const packageToDelete = await Package.findById(id);

    if (!packageToDelete) {
      return res.status(404).send({ message: 'Package not found' });
    }

    // Delete the associated plan using plan_id from the package
    const planId = packageToDelete.plan_id;
    if (planId) {
      await Plan.findByIdAndDelete(planId);
    }

    // Delete the package itself
    await Package.findByIdAndDelete(id);

    res.status(200).send({ message: 'Package and associated plan deleted successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get a single package
exports.getPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findById(id);

    if (!package) {
      return res.status(404).send({ message: 'Package not found' });
    }

    res.status(200).send(package);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({});
    res.status(200).send(packages);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
