const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//plugin is an extension from passport local mongoose which accounts 
//for fields such as passwords, usernames (unique) and other additional methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);