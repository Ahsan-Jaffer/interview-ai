import React from "react";

/**
 * UI Layer – JobDescriptionPanel
 * Receives props from the parent page (controlled component pattern).
 * No state / side-effects live here.
 */
const JobDescriptionPanel = ({ value = "", onChange, maxChars = 5000 }) => {
  return (
    <div className="jd-panel">
      {/* Panel header */}
      <div className="jd-panel__header">
        <div className="jd-panel__title-row">
          <span className="jd-panel__icon" aria-hidden="true">📋</span>
          <h2 className="jd-panel__title">Target Job Description</h2>
        </div>
        <span className="jd-panel__badge">Required</span>
      </div>

      {/* Textarea */}
      <textarea
        className="jd-panel__textarea"
        placeholder={`Paste the full job description here...\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        maxLength={maxChars}
        aria-label="Job Description"
      />

      {/* Char count */}
      <div className="jd-panel__footer">
        <span className="jd-panel__char-count">
          {value.length} / {maxChars.toLocaleString()} chars
        </span>
      </div>
    </div>
  );
};

export default JobDescriptionPanel;
