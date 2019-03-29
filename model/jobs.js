const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create hacks schema
const jobSchema = new schema({
	post_id:{type : String},
	post_body:{type : String},
	post_title:{type:String},
	category:{type : String},
	subcategories:[{title: String}],
	tags: [{title: String}],
	language:{type : String},
	status:{type: String},
	country:{type: String},
	created_at:{type: Date},
	updated_at:{type: Date},
	contributor_id:{type:String},
	external_url : {type: String},
	image : {type:String},
	video : {type: String},
	applications : {user_gid:String,user_name:String, user_email:String,is_rejected:Boolean}
});

const Jobs = mongoose.model('Jobs',jobSchema);

module.exports = Jobs;