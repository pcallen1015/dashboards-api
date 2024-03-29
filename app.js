const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const init = require('./config/init')();
const config = require('./config/config');

let mongoUri = `${config.db.host}:${config.db.port}/${config.db.name}`;
console.log(`Connecting to MongoDB: ${mongoUri}`);
let db = mongoose.connect(`mongodb://${mongoUri}`, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500
}).then(() => {
    console.log('Successfully connected to MongoDB');
}, (error) => {
    console.log(error);
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:4200', /\.cisco\.com/],
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
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

app.route('/starwars')
    .get((req, res) => {
        console.log('== EXTERNAL REQUEST TEST ==');
        return request(`https://swapi.co/api/people/1`, { json: true }, (error, r, body) => {
            if (error) {
                console.log('ERROR');
                console.log(error);
                return res.status(500).send(error);
            }
            return res.send(body);
        });
    });
 
app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});