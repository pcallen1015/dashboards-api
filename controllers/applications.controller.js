'use strict';

var mongoose = require('mongoose');
var Application = mongoose.model('Application');

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

}

exports.read = (req, res) => {

}

exports.update = (req, res) => {

}