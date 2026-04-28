const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const aiClient = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's resume and self-description match the job description.",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question asked during the interview."),
        intention: z
          .string()
          .describe(
            "The intention of interviewers behind the technical question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what point to cover, and what approach to take when answering this question.",
          ),
      }),
    )
    .describe(
      "The technical questions asked during the interview, along with the intention behind each question and how to answer them.",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question asked during the interview."),
        intention: z
          .string()
          .describe(
            "The intention of interviewers behind the behavioral question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what point to cover, and what approach to take when answering this question.",
          ),
      }),
    )
    .describe(
      "The behavioral questions asked during the interview, along with the intention behind each question and how to answer them.",
    ),
  skillGaps: z.array(
    z.object({
      skill: z.string().describe("The skill that the candidate is lacking."),
      severity: z
        .enum(["Low", "Medium", "High"])
        .describe("The severity of the skill gap."),
    }),
  ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});



const generateInterviewReport = async (
  resume,
  selfDescription,
  jobDescription,
) => {

  const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`;


  const response = await aiClient.models.generateContent({
  model: "gemini-2.0-flash",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseJsonSchema: zodToJsonSchema(interviewReportSchema),
  },
});

  return JSON.parse(response.text)
  
};

module.exports = generateInterviewReport;
