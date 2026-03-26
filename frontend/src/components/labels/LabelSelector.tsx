"use client";

import { useEffect, useState } from "react";
import { getLabels } from "@/services/api";
import { Label } from "@/types/label";

type Props = {
  selectedLabels: number[];
  setSelectedLabels: (ids: number[]) => void;
};

export default function LabelSelector({
  selectedLabels,
  setSelectedLabels,
}: Props) {
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    getLabels().then((res) => setLabels(res.data));
  }, []);

  const toggleLabel = (id: number) => {
    if (selectedLabels.includes(id)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== id));
    } else {
      setSelectedLabels([...selectedLabels, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {labels.map((label) => (
        <button
          key={label.id}
          onClick={() => toggleLabel(label.id)}
          className={`px-3 py-1 rounded text-sm border ${
            selectedLabels.includes(label.id)
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          }`}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}
