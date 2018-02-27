var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var mongoUri = 'mongodb://localhost:27017/bmi-sandbox';
var db = mongoose.connect(mongoUri, (error) => {
    if (error) console.log(error);
});

var widgetConfigSchema = new mongoose.Schema({
    contentComponentId: String,
    x: Number,
    y: Number,
    h: Number,
    w: Number,
    header: {
        visible: Boolean,
        title: String
    },
    footer: {
        visible: Boolean
    },
    parameters: Object
});

var WidgetConfig = mongoose.model('WidgetConfig', widgetConfigSchema);

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
    next();
});
 
app.get('/', (req, res) => {
    return res.send({data: 'Hello World'});
});

app.get('/widget-configs', (req, res) => {
    WidgetConfig.find({}, (error, configs) => {
        if (error) {
            console.log('ERROR:');
            console.log(error);
            return res.status(500).send({ error: error });
        }
        return res.status(200).send(configs);
    });
});
 
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});