import { useMemo } from 'react';
import { useGridConfigState } from './GridConfigProvider';

const Grid = () => {
  const {
    resolution: [resolutionX, resolutionY],
    dimensions: [gridWidth, gridHeight],
  } = useGridConfigState();

  const columns = useMemo(() => {
    return gridWidth / resolutionX;
  }, [gridWidth, resolutionX]);

  const rows = useMemo(() => {
    return gridHeight / resolutionY;
  }, [gridHeight, resolutionY]);

  return (
    <GridContainer>
      {[...new Array(columns)].map((_, columnIndex) => {
        return [...new Array(rows)].map((_, rowIndex) => (
          <div
            key={`grid_item-column${columnIndex}-row${rowIndex}`}
            style={{
              outline: 'thin solid white',
              width: resolutionX,
              height: resolutionY,
            }}
          />
        ));
      })}
    </GridContainer>
  );
};

const GridContainer = ({ children }: { children: React.ReactNode }) => {
  const {
    dimensions: [gridWidth, gridHeight],
  } = useGridConfigState();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: gridWidth,
        height: gridHeight,
        outline: 'thin solid red',
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
