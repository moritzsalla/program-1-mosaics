import { createContext, Dispatch, useContext, useReducer } from 'react';

const GridConfigStateContext = createContext(null);
GridConfigStateContext.displayName = 'GridConfigStateContext';

const GridConfigDispatchContext = createContext<Dispatch<any>>(() => null);
GridConfigDispatchContext.displayName = 'GridConfigDispatchContext';

const DEFAULT_STATE = {
  resolution: [100, 100],
  dimensions: [300, 300],
};

export enum GridActions {
  'reset',
  'set',
}

const reducer = (state, action) => {
  switch (action.type) {
    case GridActions.reset:
      return state;
    default:
      throw new Error(
        `Action type "${action.type}" doesn't exist on ${GridConfigProvider.displayName}`
      );
  }
};

const GridConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <GridConfigStateContext.Provider value={state}>
      <GridConfigDispatchContext.Provider value={dispatch}>
        {children}
      </GridConfigDispatchContext.Provider>
    </GridConfigStateContext.Provider>
  );
};
GridConfigProvider.displayName = 'GridConfigProvider';

export const useGridConfigState = () => {
  const context = useContext(GridConfigStateContext);
  if (typeof context === 'undefined') {
    const message = `useGridConfigState can only be invoked within a <${GridConfigProvider.displayName}/>`;
    const error = new Error(message);
    if (Error.captureStackTrace)
      Error.captureStackTrace(error, useGridConfigState);
    throw error;
  }
  return context;
};

export const useGridConfigDispatch = () => {
  const context = useContext(GridConfigDispatchContext);
  if (typeof context === 'undefined') {
    const message = `useGridConfigDispatch can only be invoked within a <${GridConfigProvider.displayName}/>`;
    const error = new Error(message);
    if (Error.captureStackTrace)
      Error.captureStackTrace(error, useGridConfigDispatch);
    throw error;
  }
  return context;
};

export default GridConfigProvider;
