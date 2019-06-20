var express = require('express');
var router = express.Router();

// Import the model (burger.js) to use its db functions
var burger = require('../models/burger.js');

// Create all routes and set up logic within routes where required
router.get('/', function(req, res) {
    burger.all(function(burger_data) {
        console.log(burger_data);
        res.render('index');
    })
})

module.exports = router;