const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create user schema
const userSchema = new schema({
	token:{type : String},
	user_gid:{type : String},
	user_name:{type : String},
	user_dp:{type : String},
	user_email:{type : String},
	created_at:{type: Date},
	updated_at:{type: Date, Default : Date.now()},
	college_name:{type:String},
	session : {type:String},
	user_type : {type:String},
	location : {type:String}
});

const User = mongoose.model('User',userSchema);

module.exports = User;