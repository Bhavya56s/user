const admin = require('../../models/Admin/admin');

exports.registeradmin = async (req, res) => {
  try {
    const user = new admin(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.findOne({ email });
    
    if (!user) {
      return res.status(404).send({ message: 'admin not found' });
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

exports.getAlladmins = async (req, res) => {
  try {
    const admins = await admin.find({});
    res.status(200).send(admins);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

