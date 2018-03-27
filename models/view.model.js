var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var viewSchema = new Schema({
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

mongoose.model('View', viewSchema);