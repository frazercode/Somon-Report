const mongoose = require("mongoose");
var DateOfBirthSchema =  mongoose.Schema({
    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    }
});
var UserSchema =  mongoose.Schema({
    firstName: {
		type: String,
		required: true
	},
    lastName: {
		type: String,
		required: true,
	},
    username: {
		type: String,
		required: true,
    },
	password: {
		type: String,
        required: true
	},
    occupation: {
		type: String,
	},
    dateOfBirth: {
        type: DateOfBirthSchema,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', UserSchema);