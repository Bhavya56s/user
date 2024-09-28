const express = require('express');
const router = express.Router();
const path = require('path');
const packageController = require('../../controller/Superadmin/package.controller');


router.post('/add_package', packageController.createPackage);
router.put('/update_package/:id', packageController.updatePackage);
router.delete('/delete_package/:id', packageController.deletePackage);
router.get('/get_package/:id', packageController.getPackage);
router.get('/get_all_packages', packageController.getAllPackages);







module.exports = router;
