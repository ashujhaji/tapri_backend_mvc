const mongoose = require('mongoose');

//connection with database
module.exports.connectToDb = ()=>{
	mongoose.connect('mongodb://localhost:27017/tapridb', {useNewUrlParser: true})
			.then(() => {
				console.log("Connected to Database");
			}).catch((err) => {
	    		console.log("Not Connected to Database ERROR! ", err);
			});
	mongoose.Promise = global.Promise;
}