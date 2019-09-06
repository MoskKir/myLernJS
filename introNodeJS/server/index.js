const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

// Import Database conection
const db = require('./config/database');

// Test the connect
// db.authenticate()
//     .then(() => {console.log('Database connected')})
//     .catch(error => {console.log(error)});

// Import the configurations
const configs = require('./config');

// Create the new server
const app = express();

// Filter the current environment
const config = configs[app.get('env')];


// Enable Pug
app.set('view engine', 'pug');

// Add the views folder into the project
app.set('views', path.join(__dirname, './views'));

// Load the public assets
app.use(express.static('public') );

// Get the current year
app.use((req, res, next) => {
    const date = new Date();
    res.locals .currentYear = date.getFullYear();
    // Take the current page
    res.locals.currentPage = req.path;

    return next();
});

// Pass the sitename to the views
app.locals.sitetitle = config.sitename;

// Enable body parser
app.use(bodyParser.urlencoded({extended: true}))

// Listen for the home page
app.use('/', routes() );

// Run the application
app.listen(3000);