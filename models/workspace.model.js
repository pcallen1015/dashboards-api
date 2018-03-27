var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Application = mongoose.model('Application');

var workspaceSchema = new Schema({
    workspaceId: { type: String },
    name: { type: String },
    description: { type: String },
    slug: { type: String },
    theme: { type: String },
    moduleIds: [{ type: String }]
});

workspaceSchema.post('remove', (workspace) => {
    // Remove Workspace from any Applications that reference it
    let id = workspace.workspaceId;
    Application.update({ workspaceIds: id }, { $pull: { workspaceIds: id } }, { multi: true }, (error, applications) => {
        if (error) console.log(error);
    });
});

mongoose.model('Workspace', workspaceSchema);