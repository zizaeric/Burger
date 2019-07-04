var express = require('express');
var router = express.Router();

// Import the model (burger.js) to use its db functions
var burger = require('../models/burger.js');

// Create all routes and set up logic within routes where required
router.get('/', function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.put('/api/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    // console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the Id must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.post('/', function(req, res) {
    burger.create([
        'burger_name', 'devoured'
    ], [req.body.burger_name, req.body.devoured], function(result) {
        // send back the id of the new burger
        res.json({ id: result.insertId });
        console.log("~~~~~~~~~~~~" + res);
    });
});

router.delete('/api/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the Id must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export router for the server to use
module.exports = router;