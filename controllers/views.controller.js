let mongoose = require('mongoose');
let View = mongoose.model('View');
let Module = mongoose.model('Module');
let _ = require('lodash');

exports.viewById = (req, res, next, id) => {
    View.findOne({ viewId: id }, (error, view) => {
        if (error) return res.status(500).send(error);
        if (!view) return res.status(404).send({ message: 'View Not Found' });
        req.view = view;
        next();
    });
}

exports.list = (req, res) => {
    console.log(`LIST :: Views`);
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
    console.log(`CREATE :: View`);
    let view = new View(req.body);
    view.save((error, newView) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Failed to create View' });
        }
        return res.status(200).send(newView);
    });
}

exports.read = (req, res) => {
    console.log(`READ :: View ${req.view.viewId}`);
    return res.status(200).send(req.view);
}

exports.update = (req, res) => {
    console.log(`UPDATE :: View ${req.view.viewId}`);
    let view = req.view;
    _.extend(view, req.body);
    view.save((error, updatedView) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(updatedView);
    });
}

exports.delete = (req, res) => {
    console.log(`DELETE :: View ${req.view.viewId}`);
    req.view.remove(() => {
        return res.status(200).send({ message: `View ${req.params.viewId} deleted` });
    });
}

exports.addViewToModules = (req, res) => {
    let view = req.view;
    let moduleIds = req.body.moduleIds || [];
    console.log(`Adding View ${view.viewId} to Modules ${moduleIds.toString()}`);
    Module.update({ moduleId: { $in: moduleIds } }, { $addToSet: { viewIds: view.viewId } }, { multi: true }, (error) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send();
    });
}