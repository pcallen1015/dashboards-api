module.exports = (app) => {
    let workspaces = require('../controllers/workspaces.controller');

    app.route('/workspaces')
        .get(workspaces.list)
        .post(workspaces.create);

    app.route('/workspaces/:workspaceId')
        .get(workspaces.read)
        .post(workspaces.update)
        .delete(workspaces.delete);

    app.route('/workspaces/:workspaceId/addToApplications')
        .post(workspaces.addWorkspaceToApplications);
    
    app.param('workspaceId', workspaces.workspaceById);
}