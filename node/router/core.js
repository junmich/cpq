const express = require('express');
const { addCustomer } = require('../controller/CustomerController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.use(verifyToken);
  
  // define the home page route
router.get('/customer', (req, res) => {
  res.send('Customer')
});

router.post('/customer', addCustomer);


// define the about route
router.post('/organization', (req, res) => {
  res.send('Quoatation Details')
})

module.exports = router