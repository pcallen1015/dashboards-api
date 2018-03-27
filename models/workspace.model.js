var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workspaceSchema = new Schema({
    workspaceId: { type: String },
    name: { type: String },
    description: { type: String },
    slug: { type: String },
    theme: { type: String },
    moduleIds: [{ type: String }]
});

mongoose.model('Workspace', workspaceSchema);