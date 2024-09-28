const express = require('express');
const router = express.Router();
const path = require('path');
const admincontroller = require('../../controller/Admin/admin.controller');


// Superadmin routes
router.post('/register', admincontroller.registeradmin);
router.post('/login', admincontroller.loginadmin);
router.get('/getadmin', admincontroller.getAlladmins);

module.exports = router;
