import { createContext, Dispatch, useContext, useReducer } from 'react';

const DEFAULT_STATE = {
  resolution: [100, 100],
  dimensions: [500, 500],
};

export enum ActionTypes {
  UpdateResolution,
  UpdateDimensions,
  Reset,
}

type Resolution = [number, number];
type Dimensions = [number, number];

interface StateDefinition {
  resolution: Resolution;
  dimensions: Dimensions;
}

type Actions =
  | {
      type: ActionTypes.UpdateResolution;
      update: (resolution: Resolution) => Resolution;
    }
  | {
      type: ActionTypes.UpdateDimensions;
      update: (dimensions: Dimensions) => Dimensions;
    }
  | { type: ActionTypes.Reset };

const ConfigStateContext = createContext<StateDefinition | null>(null);
ConfigStateContext.displayName = 'ConfigStateContext';

const ConfigDispatchContext = createContext<Dispatch<Actions> | null>(null);
ConfigDispatchContext.displayName = 'ConfigDispatchContext';

const reducer = (state: StateDefinition, action: Actions) => {
  switch (action.type) {
    case ActionTypes.UpdateResolution:
      return {
        ...state,
        resolution: action.update(state.resolution),
      };
    case ActionTypes.UpdateDimensions:
      return {
        ...state,
        dimensions: action.update(state.resolution),
      };
    case ActionTypes.Reset:
      return DEFAULT_STATE;
    default:
      throw new Error(
        `Action type "${action.type}" doesn't exist on ${ConfigProvider.displayName}`
      );
  }
};

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <ConfigStateContext.Provider value={state}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigStateContext.Provider>
  );
};
ConfigProvider.displayName = 'ConfigProvider';

export const useConfigState = () => {
  const context = useContext(ConfigStateContext);
  if (typeof context === 'undefined') {
    const message = `useConfigState can only be invoked within a <${ConfigProvider.displayName}/>`;
    const error = new Error(message);
    if (Error.captureStackTrace) Error.captureStackTrace(error, useConfigState);
    throw error;
  }
  return context;
};

export const useConfigDispatch = () => {
  const context = useContext(ConfigDispatchContext);
  if (typeof context === 'undefined') {
    const message = `useConfigDispatch can only be invoked within a <${ConfigProvider.displayName}/>`;
    const error = new Error(message);
    if (Error.captureStackTrace)
      Error.captureStackTrace(error, useConfigDispatch);
    throw error;
  }
  return context;
};

export default ConfigProvider;
