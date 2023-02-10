import Grid from './primitives/grid';
import GridConfigProvider from './providers/ConfigProvider';
import TransitionProvider from './providers/TransitionProvider';
import InputPanel from './shared/inputPanel';

import styles from './App.module.css';

const DataWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TransitionProvider>
      <GridConfigProvider>{children}</GridConfigProvider>
    </TransitionProvider>
  );
};

const Layout = ({
  renderLeft,
  renderRight,
}: {
  renderLeft: React.ReactNode;
  renderRight: React.ReactNode;
}) => {
  return (
    <div className={styles.layout}>
      <div className={styles.layoutPanel}>{renderLeft}</div>
      <div className={styles.layoutPanel}>{renderRight}</div>
    </div>
  );
};

const App = () => {
  return (
    <DataWrapper>
      <Layout renderLeft={<InputPanel />} renderRight={<Grid />} />
    </DataWrapper>
  );
};

export default App;
