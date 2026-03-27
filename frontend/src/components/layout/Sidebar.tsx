"use client";

import { useState } from "react";
import { createLabel } from "@/services/api";

export default function Sidebar({
  onLabelCreated,
}: {
  onLabelCreated?: () => void;
}) {
  const [newLabel, setNewLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!newLabel.trim()) return;

    try {
      setLoading(true);
      await createLabel(newLabel);

      window.dispatchEvent(new Event("labelsUpdated"));
      setNewLabel("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "Label already exists") {
          alert("Label already exists");
        } else {
          alert("Failed to create label");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold mb-8">Notes App</h1>

      <div className="space-y-3 mb-8">
        <p className="font-medium text-gray-800">All Notes</p>
        <p className="text-gray-500">Labels</p>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-semibold mb-2">Create Label</h3>

        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Enter label name"
          className="w-full border rounded px-2 py-1 text-sm mb-4"
        />
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-6"
        >
          {loading ? "Adding..." : "+ Add Label"}
        </button>
      </div>
    </div>
  );
}
