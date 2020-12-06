import React, { useContext } from "react";
import Grid from "./Grid";
import Toolbar from "./toolbar/Toolbar";
import { Context, Provider } from "./Context";

export default function App() {
  const context = useContext(Context);

  return (
    <Provider>
      <div className="m-5">
        <Toolbar />
        <div className="mt-5">
          <Grid />
        </div>
      </div>
    </Provider>
  );
}
