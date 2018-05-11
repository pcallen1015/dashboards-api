let mongoose = require('mongoose');
let Module = mongoose.model('Module');
let Workspace = mongoose.model('Workspace');
let _ = require('lodash');

exports.moduleById = (req, res, next, id) => {
    Module.findOne({ moduleId: id }, (error, module) => {
        if (error) return res.status(500).send(error);
        if (!module) return res.status(404).send({ message: 'Module Not Found' });
        req.module = module;
        next();
    });
}

exports.list = (req, res) => {
    console.log(`LIST :: Modules`)
    Module.find({}, (error, modules) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(modules);
    });
}

exports.create = (req, res) => {
    console.log(`CREATE :: Module`);
    let module = new Module(req.body);
    module.save((error, newModule) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Failed to create Module' });
        }
        return res.status(200).send(newModule);
    });
}

exports.read = (req, res) => {
    console.log(`READ :: Module ${req.module.moduleId}`);
    return res.status(200).send(req.module);
}

exports.update = (req, res) => {
    console.log(`UPDATE :: Module ${req.module.moduleId}`);
    let module = req.module;
    _.extend(module, req.body);
    module.save((error, updatedModule) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(updatedModule);
    });
}

exports.delete = (req, res) => {
    console.log(`DELETE :: Module ${req.module.moduleId}`);
    req.module.remove(() => {
        return res.status(200).send({ message: `Module ${req.params.moduleId} deleted` });
    });
}

exports.addModuleToWorkspaces = (req, res) => {
    let module = req.module;
    let workspaceIds = req.body.workspaceIds || [];
    console.log(`Adding Module ${module.moduleId} to Workspaces ${workspaceIds.toString()}`);
    Workspace.update({ workspaceId: { $in: workspaceIds } }, { $addToSet: { moduleIds: module.moduleId } }, { multi: true }, (error) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send();
    });
}