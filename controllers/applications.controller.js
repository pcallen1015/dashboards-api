let mongoose = require('mongoose');
let Application = mongoose.model('Application');

exports.list = (req, res) => {
    Application.find({}, (error, applications) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(applications);
    });
}

exports.create = (req, res) => {
    return res.status(404).send({ message: 'Not Implemented' });
}

exports.read = (req, res) => {
    return res.status(404).send({ message: 'Not Implemented' });
}

exports.update = (req, res) => {
    return res.status(404).send({ message: 'Not Implemented' });
}