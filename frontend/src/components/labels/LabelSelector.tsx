"use client";

import { type Label } from "@/types/label";

type Props = {
  labels: Label[];
  selectedLabels: number[];
  setSelectedLabels: (ids: number[]) => void;
};

export default function LabelSelector({
  labels,
  selectedLabels,
  setSelectedLabels,
}: Props) {
  const toggleLabel = (id: number) => {
    if (selectedLabels.includes(id)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== id));
    } else {
      setSelectedLabels([...selectedLabels, id]);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {labels.map((label) => (
        <button
          key={label.id}
          onClick={() => toggleLabel(label.id)}
          className={`px-2 py-1 rounded text-sm border border-gray-200 ${
            selectedLabels.includes(label.id)
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 p-4 rounded text-xs cursor-pointer hover:bg-blue-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          }`}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}
