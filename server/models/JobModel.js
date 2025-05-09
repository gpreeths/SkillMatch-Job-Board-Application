const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true  // Ensure salary is required
    },
    companyName: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    applications: [{
        applicant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        name: String,
        email: String,
        coverLetter: String
      }]
      
});

module.exports = mongoose.model('JobPost', jobPostSchema);
