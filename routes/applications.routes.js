'use strict';

module.exports = (app) => {
    var applications = require('../controllers/applications.controller');

    app.route('/applications')
        .get(applications.list);
}