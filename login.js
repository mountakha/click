var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);




module.exports = mongoose.model('Account', Account);
