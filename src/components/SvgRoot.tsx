import { atom, useAtom } from "jotai";

import { SvgShapes } from "./SvgShapes";
import { addDotAtom, commitDotsAtom, SvgDots } from "./SvgDots";
import { type Point } from "~/types/svg";

const drawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (get, set) => {
  set(drawingAtom, true);
});

const handleMouseUpAtom = atom(null, (get, set) => {
  set(drawingAtom, false);
  set(commitDotsAtom);
});

const handleMouseMoveAtom = atom(null, (get, set, update: Point) => {
  if (get(drawingAtom)) {
    set(addDotAtom, update);
  }
});

export const SvgRoot = () => {
  const [, handleMouseUp] = useAtom(handleMouseUpAtom);
  const [, handleMouseDown] = useAtom(handleMouseDownAtom);
  const [, handleMouseMove] = useAtom(handleMouseMoveAtom);
  return (
    <svg
      width="400"
      height="200"
      viewBox="0 0 400 200"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => {
        const { x, y } = e.currentTarget.getBoundingClientRect();
        handleMouseMove([e.clientX - x, e.clientY - y]);
      }}
    >
      <rect width="400" height="400" fill="#eee" />
      <SvgShapes />
      <SvgDots />
    </svg>
  );
};
