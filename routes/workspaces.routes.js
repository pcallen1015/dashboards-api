'use strict';

module.exports = (app) => {
    var workspaces = require('../controllers/workspaces.controller');

    app.route('/workspaces')
        .get(workspaces.list);

    app.route('/workspaces/:workspaceId')
        .post(workspaces.update)
        .delete(workspaces.delete);

    app.route('/workspaces/:workspaceId/addToApplications')
        .post(workspaces.addWorkspaceToApplications);
}