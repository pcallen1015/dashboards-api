var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var mongoUri = 'mongodb://localhost:27017/bmi-sandbox';
var db = mongoose.connect(mongoUri, (error) => {
    if (error) console.log(error);
});


var app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var originsAllowed = ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:8080'];
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
    if (originsAllowed.indexOf(req.headers.origin) > -1) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    next();
});

// Models
require('./models/application.model');
require('./models/workspace.model');
require('./models/module.model');
require('./models/view.model');

// Routes
require('./routes/applications.routes')(app);
require('./routes/workspaces.routes')(app);
require('./routes/modules.routes')(app);
require('./routes/views.routes')(app);
 
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});