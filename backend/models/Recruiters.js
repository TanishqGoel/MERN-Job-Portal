const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	type:{
		type: String,
		enum: ["Applicant","Recruiter"],
		required: true
    },
    contactNumber:{
		type: String,
		required: false
    },
    Bio:{
		type: String,
		required: false
	},
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);
