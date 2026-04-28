import React from "react";

/**
 * UI Layer – GenerateButton
 * Pink gradient CTA. Disabled state + loading spinner ready for hook layer.
 */
const GenerateButton = ({ onClick, disabled = false, loading = false }) => {
  return (
    <button
      className={`generate-btn${disabled ? " generate-btn--disabled" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
      type="button"
      aria-label="Generate My Interview Strategy"
    >
      {loading ? (
        <span className="generate-btn__spinner" aria-hidden="true" />
      ) : (
        <span className="generate-btn__icon" aria-hidden="true">✦</span>
      )}
      {loading ? "Generating…" : "Generate My Interview Strategy"}
    </button>
  );
};

export default GenerateButton;
