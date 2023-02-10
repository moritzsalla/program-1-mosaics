import { createContext, useContext, useTransition } from 'react';

type TransitionDefinition = [boolean, React.TransitionStartFunction];

const TransitionContext = createContext<TransitionDefinition | null>(null);
TransitionContext.displayName = 'TransitionContext';

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TransitionContext.Provider value={useTransition()}>
      {children}
    </TransitionContext.Provider>
  );
};
TransitionProvider.displayName = 'TransitionProvider';

export const useAppTransition = () => useContext(TransitionContext);

export const useStartAppTransition = () => useAppTransition()?.[1];

export default TransitionProvider;
