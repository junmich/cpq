const express = require('express');
const { getProducts } = require('../controller/ProductController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  }

router.use(timeLog)
  
  // define the home page route
router.get('/all', getProducts);
// define the about route
router.post('/details', (req, res) => {
  res.send('Product Detail')
})

module.exports = router