import React, { useContext } from "react";
import { Context } from "../../Context";

const ResolutionSlider = () => {
  const { params, updateParams } = useContext(Context);

  return (
    <>
      Resolution:&nbsp;
      <input
        type="range"
        value={params.resolution || 20}
        min="10"
        max="150"
        step="10"
        onChange={(e) =>
          updateParams({ ...params, resolution: Number(e.target.value) })
        }
      />
    </>
  );
};

export default ResolutionSlider;
