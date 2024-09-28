const express = require('express');
const router = express.Router();
const path = require('path');
const SuperadminController = require('../../controller/Superadmin/superadmin.controller');


// Superadmin routes
router.post('/register', SuperadminController.registersuperadmin);
router.post('/login', SuperadminController.loginsuperadmin);
router.get('/getsuperadmin', SuperadminController.getAllSuperadmins);

module.exports = router;
