const express = require('express')
const jobController = require('../controllers/jobController')
const jobRouter = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

// Employer routes
jobRouter.post('/createjob', authMiddleware, jobController.createJob)
jobRouter.delete('/delete/:jobId', authMiddleware, jobController.deleteJob)

// General user route
jobRouter.get('/getalljob', jobController.getAllJobs)


// Employee route
jobRouter.post('/apply/:jobId', authMiddleware, jobController.applyJob)

module.exports = jobRouter
