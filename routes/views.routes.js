module.exports = (app) => {
    let views = require('../controllers/views.controller');

    app.route('/views')
        .get(views.list)
        .post(views.create);
    
    app.route('/views/:viewId')
        .post(views.update)
        .delete(views.delete);
    
    app.route('/views/:viewId/addToModules')
        .post(views.addViewToModules);
    
    app.param('viewId', views.viewById);
}