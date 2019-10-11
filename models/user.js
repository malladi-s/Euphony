const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    albums: [Schema.Types.Mixed],
    artists: [Schema.Types.Mixed],
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    passwordReset: { type: String, select: false },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);