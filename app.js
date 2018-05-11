let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let bodyParser = require('body-parser');

let init = require('./config/init')();
let config = require('./config/config');

let db = mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, (error) => {
    if (error) console.log(error);
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let originsAllowed = ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:8080'];
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

// Controllers
let authCtrl = require('./controllers/authentication.controller');

app.use(authCtrl.getUsername, authCtrl.checkWhitelist);

app.use((req, res, next) => {
    console.log(`[${req.username}] Server Time: ${new Date().toISOString()}`);
    return next();
});

// Routes
require('./routes/app.routes')(app);
require('./routes/applications.routes')(app);
require('./routes/workspaces.routes')(app);
require('./routes/modules.routes')(app);
require('./routes/views.routes')(app);
 
app.listen(config.port, () => {
    console.log('Server listening on port ' + config.port);
});