import React, { useEffect } from "react";
import { Button as ExportButton } from "./Export";
import ColorSelector from "./inputs/ColorSelector";
import FunctionInput from "./inputs/FunctionInput";
import ResolutionSlider from "./inputs/ResolutionSlider";

const Toolbar = () => {
  return (
    <div className="d-flex flex-column">
      <div className="mb-3">
        <ResolutionSlider />
      </div>
      <div className="mb-3">
        <ColorSelector />
      </div>
    </div>
  );
};

export default Toolbar;
