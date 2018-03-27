'use strict';

module.exports = (app) => {
    var modules = require('../controllers/modules.controller');

    app.route('/modules')
        .get(modules.list);
}