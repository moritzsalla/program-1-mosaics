import { useConfigState } from 'components/providers/ConfigProvider';
import { useAppTransition } from 'components/providers/TransitionProvider';
import { useMemo } from 'react';

import styles from './index.module.css';

const Grid = () => {
  const [isTransitioning] = useAppTransition() || [];
  const {
    resolution: [resolutionX, resolutionY] = [0, 0],
    dimensions: [gridWidth, gridHeight] = [0, 0],
  } = useConfigState() || {};

  const columns = useMemo(() => {
    return Math.round(gridWidth / resolutionX);
  }, [gridWidth, resolutionX]);

  const rows = useMemo(() => {
    return Math.round(gridHeight / resolutionY);
  }, [gridHeight, resolutionY]);

  return (
    <div
      className={styles.loadingContainer}
      style={{ opacity: isTransitioning ? 0.5 : 1 }}
    >
      <div
        className={styles.gridContainer}
        style={{
          width: gridWidth,
          height: gridHeight,
        }}
      >
        {[...new Array(columns)].map((_, columnIndex) => {
          return [...new Array(rows)].map((_, rowIndex) => (
            <div
              key={`grid_item-column${columnIndex}-row${rowIndex}`}
              className={styles.gridItem}
              style={{
                width: resolutionX,
                height: resolutionY,
              }}
            />
          ));
        })}
      </div>
    </div>
  );
};

export default Grid;
