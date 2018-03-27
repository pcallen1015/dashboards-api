'use strict';

var mongoose = require('mongoose');
var Module = mongoose.model('Module');

exports.list = (req, res) => {
    Module.find({}, (error, modules) => {
        if (error) {
            console.log('ERROR');
            console.log(error);
            return res.status(500).send(error);
        }
        return res.status(200).send(modules);
    });
}

exports.create = (req, res) => {

}

exports.read = (req, res) => {

}

exports.update = (req, res) => {

}