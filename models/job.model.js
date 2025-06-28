const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, 'Job Title is required']
    },
    company: {
        type: String,
        required: [true, 'Company Name is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required']
    },
    jobType: {
        type: String,
        required: [true, 'Job Type is required'],
        enum: ['Full-time (On-site)', 'Part-time (On-site)', 'Full-time (Remote)', 'Part-time (Remote)']
    },
    jobDescription: {
        type: String,
        required: [true, 'Job Description is required']
    },
    qualifications: {
        type: [String],
        required: [true, 'Qualifications is required']
    }
})

module.exports = mongoose.model("Job", jobSchema);