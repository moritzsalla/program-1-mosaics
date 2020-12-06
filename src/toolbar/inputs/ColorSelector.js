import React, { useContext } from "react";
import { Context } from "../../Context";

const ColorSelector = () => {
  const { params, updateParams } = useContext(Context);

  return (
    <>
      Base Color:&nbsp;
      <input
        type="color"
        value={params.color || "#ad3e00"}
        onChange={(e) => updateParams({ ...params, color: e.target.value })}
      />
    </>
  );
};

export default ColorSelector;
