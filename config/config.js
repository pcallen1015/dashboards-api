let _ = require('lodash');

/**
 * Load application configs
 */
module.exports = _.extend(
    require(`./env/all`),
    require(`./env/${process.env.NODE_ENV}`) || {}
);