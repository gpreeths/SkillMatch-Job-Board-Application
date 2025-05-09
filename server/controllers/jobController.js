const JobPost = require('../models/jobModel');  // Correct import
const User = require('../models/userModel');    // Assuming userModel is in the correct path
const mongoose = require('mongoose');

// CREATE JOB (Only for Employers)
const createJob = async (req, res) => {
    const { title, description, location, salary, companyName } = req.body;
    const employerId = req.user.id;  // Get the employer's ID from JWT

    try {
        // Check if user is employer
        const user = await User.findById(employerId);
        if (!user || user.role !== 'employer') {
            return res.status(403).json({ message: "You are not authorized to create a job" });
        }

        // Create and save the job
        const newJob = new JobPost({
            title,
            description,
            location,
            salary,
            companyName,
            postedBy: employerId  // Employer's ID
        });
        
        await newJob.save();

        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// DELETE JOB (Only for Employers)
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  const employerId = req.user.id;  // Get the employer's ID from JWT (ensure the user is authenticated)

  try {
    // Check if user is employer
    const user = await User.findById(employerId);
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ message: "You are not authorized to delete this job" });
    }

    // Validate the jobId to check if it is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Find and delete the job
    const job = await JobPost.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL JOBS (Available for all users)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find();  // Fetch jobs from JobPost model
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const applyJob = async (req, res) => {
  const { jobId } = req.params;
  const employeeId = req.user.id;
  const { name, email, coverLetter } = req.body;

  try {
    const user = await User.findById(employeeId);
    if (!user || user.role !== 'employee') {
      return res.status(403).json({ message: "Only employees can apply for jobs" });
    }

    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicate applications
    const alreadyApplied = job.applications.some(
      (app) => app.applicant.toString() === employeeId
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    // Push the application
    job.applications.push({
      applicant: employeeId,
      name,
      email,
      coverLetter
    });

    await job.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createJob, deleteJob, getAllJobs, applyJob };
