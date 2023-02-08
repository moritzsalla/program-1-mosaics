import { useTransition } from 'react';
import './App.css';
import Grid from './primitives/grid';
import GridConfigProvider, {
  GridActions,
  useGridConfigDispatch,
} from './primitives/grid/GridConfigProvider';

const App = () => {
  const dispatch = useGridConfigDispatch();

  const [isPending, transition] = useTransition();

  return (
    <div className='App'>
      <DataWrapper>
        <input
          type='slider'
          min={1}
          max={10}
          onChange={(e) => {
            transition(() =>
              dispatch({ type: GridActions.reset, payload: null })
            );
          }}
        />
        {!isPending && <Grid />}
      </DataWrapper>
    </div>
  );
};

const DataWrapper = ({ children }: { children: React.ReactNode }) => {
  return <GridConfigProvider>{children}</GridConfigProvider>;
};

export default App;
