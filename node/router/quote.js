const express = require('express');
const { addQuotataion, addQuotataionDetails, getQuotations, getQuotation } = require('../controller/QuotationController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);
  
  // define the home page route
router.post('/header', addQuotataion);
router.get('/header/:id', getQuotation);
router.get('/header', getQuotations);

// define the about route
router.post('/details', addQuotataionDetails);

module.exports = router