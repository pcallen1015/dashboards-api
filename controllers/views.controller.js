'use strict';

var mongoose = require('mongoose');
var View = mongoose.model('View');

exports.list = (req, res) => {
    View.find({}, (error, views) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(views);
    });
}

exports.create = (req, res) => {

}

exports.read = (req, res) => {

}

exports.update = (req, res) => {
    View.findOneAndUpdate({ viewId: req.params.viewId }, req.body, { upsert: true, new: true }, (error, updatedView) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        console.log(`View ${req.params.viewId} updated successfully`);
        return res.status(200).send(updatedView);
    });
}

exports.addViewToModules = (req, res) => {
    let viewId = req.params.viewId;
    let moduleIds = req.body.moduleIds || [];
    console.log(`Adding View ${viewId} to Modules ${moduleIds.toString()}`);
    Module.update({ moduleId: { $in: moduleIds } }, { $addToSet: { viewIds: viewId } }, { multi: true }, (error) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send();
    });
}