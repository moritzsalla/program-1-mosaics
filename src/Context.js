import React, { createContext, useState } from "react";
import { withTheme } from "styled-components";

const Context = createContext();

const Provider = ({ children }) => {
  const [params, setParams] = useState({
    scale: 1,
    strokeColor: "white",
    color: "#ad3e00",
    resolution: 120.0,
    strokeWidth: 0.2
  });

  function updateParams(val) {
    setParams(val);
  }

  return (
    <Context.Provider value={{ params, updateParams }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
