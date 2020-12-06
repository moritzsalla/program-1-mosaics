import React, { useContext } from "react";
import { Context } from "../../Context";

const FunctionInput = () => {
  const { params, updateParams } = useContext(Context);

  return (
    <>
      Function: <input type="text" value={"blas" || null} />
    </>
  );
};

export default FunctionInput;
