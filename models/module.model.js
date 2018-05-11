let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Workspace = mongoose.model('Workspace');

let moduleSchema = new Schema({
    moduleId: { type: String },
    name: { type: String },
    description: { type: String },
    slug: { type: String },
    viewIds:[{ type: String }]
});

moduleSchema.post('remove', (module) => {
    // Remove Module from any Workspaces that reference it
    let id = module.moduleId;
    Workspace.update({ moduleIds: id }, { $pull: { moduleIds: id } }, { multi: true }, (error, workspaces) => {
        if (error) console.log(error);
    });
});

mongoose.model('Module', moduleSchema);