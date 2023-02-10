import Grid from './primitives/grid';
import GridConfigProvider from './providers/ConfigProvider';
import TransitionProvider from './providers/TransitionProvider';
import InputPanel from './shared/inputPanel';

import styles from './App.module.css';

const App = () => {
  return (
    <TransitionProvider>
      <GridConfigProvider>
        <div className={styles.layout}>
          <div className={styles.layoutPanel}>
            <InputPanel />
          </div>
          <div className={styles.layoutPanel}>
            <Grid />
          </div>
        </div>
      </GridConfigProvider>
    </TransitionProvider>
  );
};

export default App;
