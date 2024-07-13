const express = require('express');
const restaurantController = require('../controllers/restaurantController.js');

const router = express.Router();

router.get('/restaurant', restaurantController.getAllList);

module.exports = router;
