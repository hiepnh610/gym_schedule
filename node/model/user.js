const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    avatar: Object,
    dob: Date,
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: String,
    gender: String,
    height: Number,
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    },
    plan_id: Number,
    weight: Number
}, { timestamps: { createdAt: 'created_at' }});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.comparePassword = function(current_password, hash) {
    return bcrypt.compareSync(current_password, hash);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
