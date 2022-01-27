import React from "react";

import tempImage from "../assets/imageNotFound.png";

const Achievement = ({ name = "tempName", img = tempImage, xp = "xp" }) => {
  return (
    <div className="achievement">
      <div className="image-container">
        <img src={img} alt="achievement icon" />
      </div>
      <p className="bold">{name}</p>
      <p>{xp}</p>
    </div>
  );
};

export default Achievement;
