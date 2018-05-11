let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let applicationSchema = new Schema({
    applicationId: { type: String },
    name: { type: String },
    description: { type: String },
    workspaceIds: [{ type: String }]
});

mongoose.model('Application', applicationSchema);