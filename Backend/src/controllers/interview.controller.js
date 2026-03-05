const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const InterviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  const resumeFile = req.file;

  if (!resumeFile) {
    return res.status(400).json({ error: "Resume file is required." });
  }

  try {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await InterviewReportModel.create({
      user: req.user._id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });
    res.status(200).json({ 
        message: "Interview report generated successfully",
        interviewReport
     });
  } catch (error) {
    res.status(500).json({ error: "Failed to process resume" });
  }
}

module.exports = { generateInterviewReportController };
