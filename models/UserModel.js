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
        type: Date,
        default: Date.now
    },
    usernamefriend: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);