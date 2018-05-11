let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Module = mongoose.model('Module');

let viewSchema = new Schema({
    viewId: { type: String },
    name: { type: String },
    description: { type: String },
    slug: { type: String },
    theme: { type: String },
    editable: { type: Boolean },
    columns: { type: Number },
    widgetConfigs: [{
        x: { type: Number },
        y: { type: Number },
        h: { type: Number },
        w: { type: Number },
        showHeader: { type: Boolean },
        title: { type: String },
        showFooter: { type: Boolean },
        contentConfig: mongoose.Schema.Types.Mixed
    }]
});

viewSchema.post('remove', (view) => {
    // Remove View from any Modules that reference it
    let id = view.viewId;
    Module.update({ viewIds: id }, { $pull: { viewIds: id } }, { multi: true }, (error, modules) => {
        if (error) console.log(error);
    });
});

mongoose.model('View', viewSchema);