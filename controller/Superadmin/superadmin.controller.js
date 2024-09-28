const Superadmin = require('../../models/SuperAdmin/superadmin');

exports.registersuperadmin = async (req, res) => {
  try {
    const user = new Superadmin(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.loginsuperadmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Superadmin.findOne({ email });
    
    if (!user) {
      return res.status(404).send({ message: 'Superadmin not found' });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getAllSuperadmins = async (req, res) => {
  try {
    const superadmins = await Superadmin.find({});
    res.status(200).send(superadmins);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

