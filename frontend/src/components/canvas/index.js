import { useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const originalPositions = [
  { x: 0, y: 20, x1: 330, y1: 100 },
  { x: 170, y: 130, x1: 290, y1: 130 },
  { x: 80, y: 240, x1: 310, y1: 190 },

  { x: 700, y: 10, x1: 450, y1: 100 },
  { x: 690, y: 125, x1: 530, y1: 130 },
  { x: 765, y: 250, x1: 480, y1: 200 },
];

const CanvasComponent = () => {
  const [positions, setPositions] = useState(originalPositions);

  const calculateNewPositions = (changeWidth) => {
    const updatedPositions = originalPositions.map((item, index) => ({
      ...item,
      x: index < 3 ? item.x + changeWidth : item.x - changeWidth,
    }));
    setPositions(updatedPositions);
  };

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1440
        ? calculateNewPositions((1440 - window.innerWidth) / 2)
        : setPositions(originalPositions);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Stage
      width={800}
      height={400}
      style={{
        padding: "43px 0px",
      }}
      className="absoluteCenter"
    >
      <Layer>
        {positions.map((item, index) => (
          <Line
            key={index}
            points={[item.x, item.y, item.x1, item.y1]}
            stroke="#686868"
            strokeWidth={2}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasComponent;
