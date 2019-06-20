// ORM - Object Relational Mapper
// Import MySQL connection
var connection = require('./connection.js');

// Object for all our SQL statement functions
var orm = {
    all: function(tableInput, callback) {
        connection.query('SELECT * FROM ' + tableInput + ';', function(err, res) {
            if (err) throw err;
            callback(res)
        });
    }
};

// Export the orm object for the model (burger.js) to use
module.exports = orm;