const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create hacks schema
const adminSchema = new schema({
	token:{type : String},
	user_id:{type : String},
	institution_id:{type : String},
	institution_name:{type : String},
	institution_dp:{type : String},
	institution_email:{type : String},
	status:{type:String},
	created_at:{type: Date},
	updated_at:{type: Date, Default : Date.now()},
	courses:[{cid:String, c_name: String, sections:[{sid: String, s_name: String, studentCount: Number}]}],
	password:{type:String}
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;