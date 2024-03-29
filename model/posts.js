const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = mongoose.Schema;

//create hacks schema
const postSchema = new schema({
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
	contributor_name:{type:String},
	contributor_institute:{type:String},
	comments:[{comment_id : String, comment_body:String, commented_at:Date, commented_by:String, image:String}],
	is_job_post : {type: Boolean},
	external_url : {type: String},
	image : {type:String},
	video : {type: String}
});

postSchema.plugin(mongoosePaginate)
const Posts = mongoose.model('Posts',postSchema);

module.exports = Posts;