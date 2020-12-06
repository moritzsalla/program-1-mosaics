import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "./Context";
import { noise } from "./utils/noise";
import { map } from "./utils/map";
import { hexToRgb, rgbToHex } from "./utils/colorConverter";

const WrapperDiv = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border: ${(props) => props.strokeWeight}px solid ${(props) => props.color};
`;

const Grid = () => {
  const { params } = useContext(Context);
  const { scale, strokeWidth, resolution, color, strokeColor } = params;

  let tiles = [];

  const baseScale = 500; // arbitrary number
  const width = baseScale * scale;
  const height = baseScale * scale;

  for (let x = 0; x <= width; x += width / resolution) {
    for (let y = 0; y <= height; y += height / resolution) {
      tiles.push({
        x: x,
        y: y,
        height: height / resolution,
        width: width / resolution
      });
    }
  }

  function genColor(c, x, y) {
    c = noise(c + noise(x) + noise(y)); // noise(c + x + y)
    c = map(c, 0, 1, 0, 255);
    c = Math.round(c);
    return c;
  }

  function calcFill(x, y) {
    // The hexToRgb function returns an object with r, g, b entries
    let c = hexToRgb(color);
    c.r = genColor(c.r, x, y);
    c.g = genColor(c.g, x, y);
    c.b = genColor(c.b, x, y);
    return rgbToHex(c.r, c.g, c.b);
  }

  return (
    <WrapperDiv
      height={height}
      width={width}
      strokeWeight={strokeWidth}
      color={strokeColor}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        stroke-width={strokeWidth}
      >
        {tiles.map(({ x, y, width, height }, i) => (
          <rect
            key={i}
            y={y}
            x={x}
            width={width}
            height={height}
            fill={calcFill(x, y)}
            stroke={strokeColor}
            stroke-width={strokeWidth}
          />
        ))}
      </svg>
    </WrapperDiv>
  );
};

export default Grid;
