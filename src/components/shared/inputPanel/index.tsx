import {
  ActionTypes,
  useConfigDispatch,
} from 'components/providers/ConfigProvider';
import { useStartAppTransition } from 'components/providers/TransitionProvider';

import styles from './index.module.css';

const InputPanel = () => {
  const dispatch = useConfigDispatch();
  const startTransition = useStartAppTransition();

  const handleVerticalResolutionChange = (value: number) => {
    startTransition?.(() => {
      dispatch?.({
        type: ActionTypes.UpdateResolution,
        update: (resolution) => {
          return [value, resolution[1]];
        },
      });
    });
  };

  const handleHorizontalResolutionChange = (value: number) => {
    startTransition?.(() => {
      dispatch?.({
        type: ActionTypes.UpdateResolution,
        update: (resolution) => {
          return [resolution[0], value];
        },
      });
    });
  };

  return (
    <div className={styles.inputGroup}>
      {/* SLIDER RESOLUTION VERTICAL */}
      Slider resolution vertical{' '}
      <Slider onChange={handleVerticalResolutionChange} />
      {/* SLIDER RESOLUTION HORIZONTAL */}
      Slider resolution horizontal{' '}
      <Slider onChange={handleHorizontalResolutionChange} />
    </div>
  );
};

const Slider = ({ onChange }: { onChange: (value: number) => void }) => {
  return (
    <input
      type='range'
      className={styles.slider}
      onChange={(e) => {
        return onChange?.(Number(e.target.value));
      }}
    />
  );
};

export default InputPanel;
