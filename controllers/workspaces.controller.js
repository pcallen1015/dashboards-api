'use strict';

var mongoose = require('mongoose');
var Workspace = mongoose.model('Workspace');
var Application = mongoose.model('Application');

exports.list = (req, res) => {
    Workspace.find({}, (error, workspaces) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(workspaces);
    });
}

exports.create = (req, res) => {
    return res.status(404).send({ message: 'Not Implemented' });
}

exports.read = (req, res) => {
    return res.status(404).send({ message: 'Not Implemented' });
}

exports.update = (req, res) => {
    Workspace.findOneAndUpdate({ workspaceId: req.params.workspaceId }, req.body, { upsert: true, new: true }, (error, updatedWorkspace) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        console.log(`Workspace ${req.params.workspaceId} updated successfully`);
        return res.status(200).send(updatedWorkspace);
    });
}

exports.delete = (req, res) => {
    console.log(`Deleting Workspace ${req.params.workspaceId}`);
    Workspace.remove({ workspaceId: req.params.workspaceId }, (error) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send();
    });
}

exports.addWorkspaceToApplications = (req, res) => {
    let workspaceId = req.params.workspaceId;
    let applicationIds = req.body.applicationIds || [];
    console.log(`Adding Workspace ${workspaceId} to Applications ${applicationIds.toString()}`);
    Application.update({ applicationId: { $in: applicationIds } }, { $addToSet: { workspaceIds: workspaceId } }, { multi: true }, (error) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send();
    });
}