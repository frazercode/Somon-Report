var mongoose = require("mongoose");
var database_connected = false;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	database_connected = true;
	console.log("Database connected!");
});

module.exports.database = db;

module.exports.run = function(){
	mongoose.connect('mongodb://127.0.0.1:27017/somon-reports', 
	{useNewUrlParser: true, useUnifiedTopology: true});
}