import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";

type Point = [number, number];

const dotsAtom = atom<Point[]>([]);

const drawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (get, set) => {
  set(drawingAtom, true);
});

const handleMouseUpAtom = atom(null, (get, set) => {
  set(drawingAtom, false);
});

const handleMouseMoveAtom = atom(null, (get, set, update: Point) => {
  if (get(drawingAtom)) {
    set(dotsAtom, (prev) => [...prev, update]);
  }
});

const SvgDots = () => {
  const [dots] = useAtom(dotsAtom);
  return (
    <g>
      {dots.map(([x, y]) => (
        <circle key={`${x} ${y}`} cx={x} cy={y} r="2" fill="#aaa" />
      ))}
    </g>
  );
};

const useCommitCount = () => {
  const commitCountRef = useRef(0);
  useEffect(() => {
    commitCountRef.current += 1;
  });
  return commitCountRef.current;
};

const SvgRoot = () => {
  const [, handleMouseUp] = useAtom(handleMouseUpAtom);
  const [, handleMouseDown] = useAtom(handleMouseDownAtom);
  const [, handleMouseMove] = useAtom(handleMouseMoveAtom);
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => {
        handleMouseMove([e.clientX, e.clientY]);
      }}
    >
      <rect width="200" height="200" fill="#eee" />
      <text x="3" y="12" font-size="12px">
        Commits: {useCommitCount()}
      </text>
      <SvgDots />
    </svg>
  );
};

const App = () => (
  <>
    <SvgRoot />
  </>
);

export default App;
