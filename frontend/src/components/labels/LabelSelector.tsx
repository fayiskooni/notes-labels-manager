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
          className={`px-2 py-1 rounded text-sm border ${
            selectedLabels.includes(label.id)
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}