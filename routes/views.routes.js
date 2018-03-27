'use strict';

module.exports = (app) => {
    var views = require('../controllers/views.controller');

    app.route('/views')
        .get(views.list);
    
    app.route('/views/:viewId')
        .post(views.update);
    
    app.route('/views/:viewId/addToModules')
        .post(views.addViewToModules);
    
    app.param('viewId', views.viewById);
}