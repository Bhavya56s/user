const express = require('express');
const router = express.Router();
const path = require('path');

const subscriptionController = require('../../controller/Superadmin/subscription.controller');

// Subscription routes
router.post('/create_subscription', subscriptionController.createSubscription);
router.get('/subscriptions', subscriptionController.getAllSubscription);
router.get('/subscriptions/:id', subscriptionController.getSubscriptionById);
router.put('/subscriptions/:id', subscriptionController.updateSubscriptionById);
router.delete('/subscriptions/:id', subscriptionController.deleteSubscriptionById);

module.exports = router;
