const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	password:{
		type: String,
		required: true
	},
	type:{
		type: String,
		enum: ["Applicant","Recruiter"],
		required: true
	}
});

module.exports = Users = mongoose.model("Users", UserSchema);
