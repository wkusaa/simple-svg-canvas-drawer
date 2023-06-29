import { atom, useAtom } from "jotai";

import { createShapeAtom, SvgShape } from "./SvgShape";
import { type Point } from "~/types/svg";
import { selectAtom, selectedAtom, unselectAtom } from "~/utils/selection";
import { shapeAtomsAtom } from "~/utils/history";

export const addShapeAtom = atom(
  null,
  (_get, set, update: readonly Point[]) => {
    if (update.length < 2) return;
    const shapeAtom = createShapeAtom(update);
    set(shapeAtomsAtom, (prev) => [...prev, shapeAtom]);
    set(selectAtom, shapeAtom);
  }
);

export const deleteSelectedShapeAtom = atom(
  (get) => {
    const isSelected = !!get(selectedAtom);
    return isSelected;
  },
  (get, set, _update) => {
    const selected = get(selectedAtom);
    if (selected) {
      set(shapeAtomsAtom, (prev) => prev.filter((item) => item !== selected));
      set(unselectAtom, null);
    }
  }
);

export const SvgShapes = () => {
  const [shapeAtoms] = useAtom(shapeAtomsAtom);
  return (
    <g>
      {shapeAtoms.map((shapeAtom) => (
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        <SvgShape key={`${shapeAtom}`} shapeAtom={shapeAtom} />
      ))}
    </g>
  );
};
