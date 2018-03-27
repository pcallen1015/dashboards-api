var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    applicationId: { type: String },
    name: { type: String },
    description: { type: String },
    workspaceIds: [{ type: String }]
});

mongoose.model('Application', applicationSchema);