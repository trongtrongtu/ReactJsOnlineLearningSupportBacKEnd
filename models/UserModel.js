'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
    },
    message: {
        type: String,
    },
    created_date: {
        type: String,
    },
    usernamefriend: {
        type: String,
    },
    roomName: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);