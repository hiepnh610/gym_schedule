const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    avatar: {
        type: Object
    },
    dob: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String
    },
    gender: {
        type: String
    },
    height: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    },
    plan_id: {
        type: Number
    },
    weight: {
        type: Number
    },
    address: {
        type: String
    },
    bio: {
        type: String
    },
    following: {
        type: Array
    },
    follower: {
        type: Array
    }
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
