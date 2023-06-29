import { useAtom } from "jotai";

import { setColorAtom } from "~/utils/selection";
import { deleteSelectedShapeAtom } from "./SvgShapes";
import { undoAtom } from "~/utils/history";

const colors = [
  { value: "", label: "Default" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

export const Controls = () => {
  const [currentColor, setColor] = useAtom(setColorAtom);
  const [isSelected, deleteShape] = useAtom(deleteSelectedShapeAtom);
  const [hasHistory, undo] = useAtom(undoAtom);
  return (
    <div className="mt-4 flex flex-row items-center text-lg font-semibold">
      Color:
      {colors.map(({ value, label }) => (
        <button
          className={`ml-4 rounded-lg p-4 text-white hover:bg-gray-900 ${
            currentColor === null || currentColor === value
              ? "bg-gray-500"
              : "bg-gray-700"
          }`}
          key={value}
          disabled={currentColor === null || currentColor === value}
          onClick={() => setColor(value)}
        >
          {label}
        </button>
      ))}
      <div className="ml-4 h-10 border-r-2 border-black"></div>
      <button
        disabled={!isSelected}
        onClick={deleteShape}
        className={`ml-4 rounded-lg p-4 text-white hover:bg-gray-900 ${
          !isSelected ? "bg-gray-500" : "bg-gray-700"
        }`}
      >
        Delete
      </button>
      <div className="ml-4 h-10 border-r-2 border-black"></div>
      <button
        disabled={!hasHistory}
        onClick={undo}
        className={`ml-4 rounded-lg p-4 text-white hover:bg-gray-900 ${
          !hasHistory ? "bg-gray-500" : "bg-gray-700"
        }`}
      >
        Undo
      </button>
    </div>
  );
};
