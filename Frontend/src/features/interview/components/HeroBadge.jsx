import React from "react";

/**
 * UI Layer – HeroBadge
 * Small indicator dot above the page title.
 */
const HeroBadge = () => {
  return (
    <div className="hero-badge" aria-hidden="true">
      <span className="hero-badge__dot" />
    </div>
  );
};

export default HeroBadge;
