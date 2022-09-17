const mongoose = require("mongoose");

var FileSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    path: {
        type: String,
        required: true
    }
});

var ReportSchema =  mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
		type: String,
		required: true
	},
    details: {
		type: String,
		required: true
	},
    type: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    files: {
        type: [FileSchema]
    }
});

module.exports = mongoose.model('report', ReportSchema);