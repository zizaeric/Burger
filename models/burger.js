// Import orm and create functions to interact with database
var orm = require('../config/orm.js');

var burger = {
    all: function(callback) {
        orm.all('burgers', function(res) {
            callback(res);
        });
    },

}

// Export db functions for controller (burgers_controller.js)
module.exports = burger;