import React, { useRef, useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport, reports = [] } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeName, setResumeName] = useState("");

  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    try {
      const resumeFile = resumeInputRef.current?.files?.[0];

      if (!jobDescription.trim()) {
        alert("Job description is required");
        return;
      }

      if (!resumeFile && !selfDescription.trim()) {
        alert("Upload resume OR write self description");
        return;
      }

      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      navigate(`/interview/${data._id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate report");
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader"></div>
        <h1>Generating your interview strategy...</h1>
      </main>
    );
  }

  return (
    <main className="home-page">
      <div className="bg-glow bg-glow--left"></div>
      <div className="bg-glow bg-glow--right"></div>

      <section className="hero">
        <span className="ai-pill">✦ AI POWERED</span>

        <h1>
          Create Your Custom <span>Interview Plan</span>
        </h1>

        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </section>

      <section className="interview-card">
        <div className="interview-card__body">
          {/* Left */}
          <div className="panel">
            <div className="panel__header">
              <div className="icon-box">💼</div>
              <h2>Target Job Description</h2>
              <span className="badge">Required</span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              maxLength={5000}
              className="textarea textarea--large"
              placeholder={`Paste the full job description here...\n\ne.g. Senior Frontend Engineer requires React, TypeScript, API integration, and system design...`}
            />

            <div className="char-counter">
              {jobDescription.length} / 5000 chars
            </div>
          </div>

          <div className="center-orb">✦</div>

          {/* Right */}
          <div className="panel">
            <div className="panel__header">
              <div className="icon-box">👤</div>
              <h2>Your Profile</h2>
            </div>

            <div className="upload-group">
              <div className="label-row">
                <label>Upload Resume</label>
                <span className="badge badge--soft">Best Results</span>
              </div>

              <label className="dropzone" htmlFor="resume">
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  accept=".pdf,.docx"
                  onChange={(e) =>
                    setResumeName(e.target.files?.[0]?.name || "")
                  }
                />

                <div className="upload-icon">☁</div>
                <strong>
                  {resumeName || "Click to upload or drag & drop"}
                </strong>
                <small>PDF or DOCX (Max 5MB)</small>
              </label>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="self-box">
              <label>Quick Self-Description</label>
              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                className="textarea textarea--small"
                placeholder="Briefly describe your experience, key skills, and years of experience..."
              />
            </div>

            <div className="info-box">
              <span>i</span>
              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </p>
            </div>
          </div>
        </div>

        <div className="interview-card__footer">
          <div className="feature-list">
            <div>
              <span>🧠</span>
              <p>
                <strong>AI-Powered</strong>
                <small>Smart Analysis</small>
              </p>
            </div>

            <div>
              <span>🎯</span>
              <p>
                <strong>Personalized</strong>
                <small>For You</small>
              </p>
            </div>

            <div>
              <span>⚡</span>
              <p>
                <strong>Quick Results</strong>
                <small>Approx 30s</small>
              </p>
            </div>
          </div>

          <button className="generate-btn" onClick={handleGenerateReport}>
            ✦ Generate My Interview Strategy →
          </button>
        </div>
      </section>

      {reports.length > 0 && (
        <section className="recent-reports">
          <h2>Recent Interview Plans</h2>

          <div className="reports-grid">
            {reports.map((report) => (
              <article
                key={report._id}
                className="report-card"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3>{report.title || "Untitled Position"}</h3>
                <p>{new Date(report.createdAt).toLocaleDateString()}</p>
                <span>{report.matchScore || 0}% Match</span>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className="page-footer">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </footer>
    </main>
  );
};

export default Home;