// ORM - Object Relational Mapper
// Import MySQL connection
var connection = require('./connection.js');

// Helper functions
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
     
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

//Helper function to convert key/value pair to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys, push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if(Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations, ex: {style: Okinawan Karate Kata} => ["style='Okinawan Karate Kata'"], or {amazing: true} => ["amazing=true"]
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions
var orm = {
    all: function(tableInput, callback) {
        connection.query('SELECT * FROM ' + tableInput + ';', function(err, res) {
            if (err) throw err;
            callback(res)
        });
    },
    create: function(tableInput, cols, vals, callback) {
        var queryString = "INSERT INTO " + tableInput;
        
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        
        console.log(queryString);
        
        connection.query(queryString, vals, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });        
    },
    // objColVals ex: {burger_name: roadkill, devoured: true} 
    // update: function(tableInput, condition, callback) {
    //     connection.query('UPDATE '+tableInput+' SET devoured=true WHERE id='+condition+';', function(err, res) {
    //         if (err) {
    //             throw err;
    //         }
    //         callback(res)
    //     });
    // },
    update: function(tableInput, objColVals, condition, callback) {
        var queryString = "UPDATE " + tableInput;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res)
        });
    },
    delete: function(tableInput, condition, callback) {
        var queryString = "DELETE FROM " + tableInput;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    }
};

// Export the orm object for the model (burger.js) to use
module.exports = orm;