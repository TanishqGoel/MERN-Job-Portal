const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicantSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	institutionName: {
        type: [],
        required:false
    },
    startYear: {
        type: Array,
        required:false
    },
    endYear: {
        type: Array,
        required:false
    },
	password:{
		type: String,
		required: true
    },
    skills:{
		type: [],
		required: false
    },
	type:{
		type: String,
		enum: ["Applicant","Recruiter"],
		required: true
	}
});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);
