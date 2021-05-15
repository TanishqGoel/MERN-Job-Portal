const mongoose = require('mongoose');

let Job = new mongoose.Schema({
   
    jobName: {
        type: String,
        required: true,
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Max_Applications: {
        type: Number,
        required: true
    },
    Max_Positions: {
        type: Number,
        required: true
    },
    Posting: {
        type: String,
        required: true
    },
    Deadline: {
        type: String,
        required: true
    },
    Skillset: {
        type: String,
    },
    Type_of_job:{
		type: String,
		enum: ["Full-time","Part-time","Work from Home"],
		required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Job', Job);