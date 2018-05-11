let mongoose = require('mongoose');
let Workspace = mongoose.model('Workspace');
let Application = mongoose.model('Application');
let _ = require('lodash');

exports.workspaceById = (req, res, next, id) => {
    Workspace.findOne({ workspaceId: id }, (error, workspace) => {
        if (error) return res.status(500).send(error);
        if (!workspace) return res.status(404).send({ message: 'Workspace Not Found' });
        req.workspace = workspace;
        next();
    });
}

exports.list = (req, res) => {
    console.log(`LIST :: Workspaces`);
    Workspace.find({}, (error, workspaces) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(workspaces);
    });
}

exports.create = (req, res) => {
    console.log(`CREATE :: Workspace`);
    let workspace = new Workspace(req.body);
    workspace.save((error, newWorkspace) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Failed to create Workspace' });
        }
        return res.status(200).send(newWorkspace);
    });
}

exports.read = (req, res) => {
    console.log(`READ :: Workspace ${req.workspace.workspaceId}`);
    return res.status(200).send(req.workspace);
}

exports.update = (req, res) => {
    console.log(`UPDATE :: Workspace ${req.workspace.workspaceId}`);
    let workspace = req.workspace;
    _.extend(workspace, req.body);
    workspace.save((error, updatedWorkspace) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: `Failed to update Workspace ${workspace.workspaceId}` });
        }
        return res.status(200).send(updatedWorkspace);
    });
}

exports.delete = (req, res) => {
    console.log(`DELETE :: Workspace ${req.workspace.workspaceId}`);
    req.workspace.remove(() => {
        return res.status(200).send({ message: `Workspace ${req.workspace.workspaceId} deleted` });
    });
}

exports.addWorkspaceToApplications = (req, res) => {
    let workspace = req.workspace;
    let applicationIds = req.body.applicationIds || [];
    console.log(`Adding Workspace ${workspace.workspaceId} to Applications ${applicationIds.toString()}`);
    Application.update({ applicationId: { $in: applicationIds } }, { $addToSet: { workspaceIds: workspace.workspaceId } }, { multi: true }, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send({ message: `Workspace ${workspace.workspaceId} added to Applications ${applicationIds.toString()}` });
    });
}