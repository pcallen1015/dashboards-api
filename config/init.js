let glob = require('glob');

module.exports = () => {
    let files = glob.sync(`./config/env/${process.env.NODE_ENV}.js`);
    if (!files.length) {
        if (process.env.NODE_ENV) console.log(`No config file found for "${process.env.NODE_ENV}" environment, using "development" instead`);
        else console.log(`NODE_ENV is not defined, using "development" instead`);

        process.env.NODE_ENV = 'development';
    } else {
        console.log(`Application loaded using "${process.env.NODE_ENV}" environment configuration`)
    }
}