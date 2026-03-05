const express = require('express');
const interviewRouter = express.Router();
const aiService = require('../services/ai.service');

const authUser = require('../middlewares/auth.middleware');
const {generateInterviewReportController} = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');



/*
* @route POST /api/interview/
* @description Generate new interview report on the bases of user's self-description, resume pdf and job description.
* @access Private
*/ 

interviewRouter.post('/', authUser, upload.single('resume'), generateInterviewReportController);





module.exports = interviewRouter;