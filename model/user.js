const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create user schema
const userSchema = new schema({
	user_id:{type : String},
	user_gid:{type : String},
	user_name:{type : String},
	user_dp:{type : String},
	user_email:{type : String},
	created_at:{type: Date},
	updated_at:{type: Date, Default : Date.now()},
	contribution:[{hack_id: String, created_at: Date}],
	favourites:[{hack_id: String}],
	interests:[{category_name: String}]
});

const User = mongoose.model('User',userSchema);

module.exports = User;