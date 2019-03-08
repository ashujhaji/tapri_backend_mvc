const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = mongoose.Schema;

//create hacks schema
const hacksSchema = new schema({
	hack_id:{type : String},
	body:{type : String},
	category:{type : String},
	subcategories:[{title: String}],
	tags: [{title: String}],
	language:{type : String},
	status:{type: String},
	country:{type: String},
	created_at:{type: Date},
	updated_at:{type: Date},
	contributor:[{name:String, gid:String}],
	internal_url : {type: String},
	external_url : {type: String},
	video : {type: String}
});

hacksSchema.plugin(mongoosePaginate)
const Hacks = mongoose.model('Hacks',hacksSchema);

module.exports = Hacks;