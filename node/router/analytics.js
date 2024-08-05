const express = require('express');
const { getMetrics } = require('../controller/MrrMetricController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.use(verifyToken);

router.get('/metrics', getMetrics);
module.exports = router