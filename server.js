// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

// Set the port for the app
var PORT = process.env.PORT || 3000;

// Create express app instance
var app = express();

// Serve application's static content from the "public" directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(methodOverride('_method'));

// Set handlebars as the default templating engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Import routes and give server access to them
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

// Import the model (burger.js) to use its database functions
var burger = require('./models/burger.js');

// Start server so that it can begin listening to client requests
app.listen(PORT, function() {
    // Log when server has started
    console.log("Server listening on: http://localhost:" + PORT);
});