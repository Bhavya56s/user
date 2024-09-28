const Plan = require('../../models/SuperAdmin/plan'); // Adjust the path as needed

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).send(newPlan);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update an existing plan
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlan = await Plan.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPlan) {
      return res.status(404).send({ message: 'Plan not found' });
    }

    res.status(200).send(updatedPlan);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).send({ message: 'Plan not found' });
    }

    res.status(200).send({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get a single plan
exports.getPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).send({ message: 'Plan not found' });
    }

    res.status(200).send(plan);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).send(plans);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
