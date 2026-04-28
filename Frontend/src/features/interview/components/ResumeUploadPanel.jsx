import React from "react";

/**
 * UI Layer – ResumeUploadPanel
 * Drag-and-drop resume zone + OR divider.
 * All handlers are passed in as props (wired in the hook layer later).
 */
const ResumeUploadPanel = ({
  isDragging = false,
  file = null,
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const handleInputChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) onFileChange?.(selected);
  };

  return (
    <div className="resume-panel">
      {/* Label row */}
      <div className="resume-panel__label-row">
        <span className="resume-panel__label">Upload Resume</span>
        <span className="resume-panel__badge resume-panel__badge--blue">Best Results</span>
      </div>

      {/* Drop zone */}
      <label
        htmlFor="resume-file-input"
        className={`resume-panel__dropzone${isDragging ? " resume-panel__dropzone--dragging" : ""}${file ? " resume-panel__dropzone--has-file" : ""}`}
        onDragOver={(e) => { e.preventDefault(); onDragOver?.(); }}
        onDragLeave={onDragLeave}
        onDrop={(e) => { e.preventDefault(); onDrop?.(e.dataTransfer.files?.[0]); }}
      >
        <div className="resume-panel__drop-icon" aria-hidden="true">
          {file ? "✅" : "☁️"}
        </div>
        <p className="resume-panel__drop-text">
          {file ? file.name : "Click to upload or drag & drop"}
        </p>
        <p className="resume-panel__drop-hint">PDF or DOCX (Max 5MB)</p>
        <input
          id="resume-file-input"
          type="file"
          accept=".pdf,.docx"
          className="resume-panel__file-input"
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

export default ResumeUploadPanel;
