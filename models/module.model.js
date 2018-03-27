var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moduleSchema = new Schema({
    moduleId: { type: String },
    name: { type: String },
    description: { type: String },
    slug: { type: String },
    viewIds:[{ type: String }]
});

mongoose.model('Module', moduleSchema);