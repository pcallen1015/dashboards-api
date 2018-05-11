let config = require('../config/config');

exports.getUsername = (req, res, next) => {
    let env = process.env.NODE_ENV;
    req.username = req.headers.auth_user;
    return next();
};

exports.checkWhitelist = (req, res, next) => {
    /*
    console.log(`Checking Whitelist...`);
    console.log(config.whitelist);

    if (config.whitelist.indexOf(req.username) === -1) return res.status(401).send({ message: `User ${req.username} is not on the Whitelist` });
    */

    return next();
};