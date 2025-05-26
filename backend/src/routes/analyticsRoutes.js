const express = require('express');
const router = express.Router();
const { getOrderAnalytics } = require('../controllers/analyticsController');

// Assuming you have an isAdmin middleware
router.get('/orders', getOrderAnalytics);

module.exports = router;