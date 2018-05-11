let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Application = mongoose.model('Application');

let workspaceSchema = new Schema({
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