const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create hacks schema
const adminSchema = new schema({
	token:{type : String},
	center_code:{type : String},
	institution_name:{type : String},
	institution_dp:{type : String},
	institution_email:{type : String},
	status:{type:String},
	created_at:{type: Date, Default:Date.now()},
	updated_at:{type: Date, Default : Date.now()},
	university:{type:String},
	student_details : [{
		roll_no : String,
		name : String,
		session : String
	}],
	password:{type:String}
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;