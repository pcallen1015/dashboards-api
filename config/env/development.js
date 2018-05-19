module.exports = {
    name: 'development',
    port: 3000,
    db: {
        host: process.env.MONGODB_HOST || 'sj-il-bmi-mongo',
        port: process.env.MONGODB_PORT || 27017,
        name: process.env.MONGODB_NAME || 'bmi-sandbox'
    }
}