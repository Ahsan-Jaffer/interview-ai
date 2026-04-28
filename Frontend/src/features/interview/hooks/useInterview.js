import { useState } from "react";
import { generateInterviewReport } from "../serivces/interview.api";

export const useInterview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = async ({ resumeFile, selfDescription, jobDescription }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });

      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateReport,
    loading,
    error,
  };
};