const express = require('express');
const router = express.Router();
const path = require('path');

const planController = require('../../controller/Superadmin/plan.controller');
// Plan routes
router.post('/create_plan', planController.createPlan);
router.put('/update_plan/:id', planController.updatePlan);
router.delete('/delete_plan/:id', planController.deletePlan);
router.get('/get_plan/:id', planController.getPlan);
router.get('/get_all_plans', planController.getAllPlans);



module.exports = router;
