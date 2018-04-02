'use strict';

module.exports = (app) => {
    var modules = require('../controllers/modules.controller');

    app.route('/modules')
        .get(modules.list)
        .post(modules.create);
    
    app.route('/modules/:moduleId')
        .get(modules.read)
        .post(modules.update)
        .delete(modules.delete);
    
    app.route('/modules/:moduleId/addToWorkspaces')
        .post(modules.addModuleToWorkspaces);

    app.param('moduleId', modules.moduleById);
}