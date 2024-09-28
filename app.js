const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const SuperadminLoginRoutes = require('./routes/Superadmin/superadmin.routes'); 
const PackageRoutes = require('./routes/Superadmin/package.routes');
const PlanRoutes = require('./routes/Superadmin/plan.routes');
const UserRoutes = require('./routes/Superadmin/users.routes');
const subscriptionRoutes = require('./routes/Superadmin/subscription.routes');
const Adminlogin = require('./routes/Admin/admin.routes');

const app = express();

// Use CORS middleware with specific origin
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/PriyaDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error', error);
  });

// Superadmin Api's 
app.use('/superadmin', SuperadminLoginRoutes);
app.use('/Superadmin/package', PackageRoutes);
app.use('/Superadmin/plan', PlanRoutes);
app.use('/Superadmin/User', UserRoutes);
app.use('/Superadmin/subscription', subscriptionRoutes);

// Admin Api's
app.use('/admin', Adminlogin);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
