var mysql = require('mysql');

// MySQL DB connection info (remember to enter password)
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'MyNewPass',
    database:'burgers_db'
});

// Initiate MySQL connection
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// Export connection for ORM to use
module.exports = connection;