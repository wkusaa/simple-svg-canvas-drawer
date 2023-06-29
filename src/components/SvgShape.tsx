import { atom, useAtom } from "jotai";

import { type Point } from "~/types/svg";

const pointsToPath = (points: readonly Point[]) => {
  let d = "";
  points.forEach((point) => {
    if (d) {
      d += ` L ${point[0]} ${point[1]}`;
    } else {
      d = `M ${point[0]} ${point[1]}`;
    }
  });
  return d;
};

const shapeAtom = atom({ path: "" });

export const addShapeAtom = atom(
  null,
  (_get, set, update: readonly Point[]) => {
    set(shapeAtom, { path: pointsToPath(update) });
  }
);

export const SvgShape = () => {
  const [shape] = useAtom(shapeAtom);
  return (
    <g>
      <path d={shape.path} fill="none" stroke="black" strokeWidth="3" />
    </g>
  );
};
