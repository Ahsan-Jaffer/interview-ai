import React from "react";

/**
 * UI Layer – SelfDescriptionPanel
 * Quick text fallback when user has no resume.
 */
const SelfDescriptionPanel = ({ value = "", onChange }) => {
  return (
    <div className="self-desc">
      <label className="self-desc__label" htmlFor="self-desc-input">
        Quick Self-Description
      </label>
      <textarea
        id="self-desc-input"
        className="self-desc__textarea"
        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label="Quick Self-Description"
      />
    </div>
  );
};

export default SelfDescriptionPanel;
