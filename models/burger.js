// Import orm and create functions to interact with database
var orm = require('../config/orm.js');

var burger = {
    all: function(callback) {
        orm.all('burgers', function(res) {
            callback(res);
        });
    },
    //variables cols and vals are arrays
    update: function(objColsVals, condition, callback) {
        orm.update('burgers', objColsVals, condition, function(res) {
            callback(res);
        });
    },
    create: function(cols, vals, callback) {
        orm.create('burgers', cols, vals, function(res) {
            callback(res);
        });
    },
    delete: function(condition, callback) {
        orm.delete('burgers', condition, function(res) {
            callback(res);
        });
    }
};

// Export db functions for controller (burgers_controller.js)
module.exports = burger;