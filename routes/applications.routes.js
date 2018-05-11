module.exports = (app) => {
    let applications = require('../controllers/applications.controller');

    app.route('/applications')
        .get(applications.list);
}