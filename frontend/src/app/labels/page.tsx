"use client";

import { useCallback, useEffect, useState } from "react";
import { getLabels, deleteLabel, updateLabel } from "@/services/api";
import LoadingState from "@/components/ui/LoadingState";
import { type Label } from "@/types/label";

export default function LabelsPage() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [isLabelsLoading, setIsLabelsLoading] = useState(true);

  const loadLabels = useCallback(async () => {
    setIsLabelsLoading(true);
    try {
      const res = await getLabels();
      setLabels(res.data ?? []);
    } catch (error) {
      console.error("Failed to fetch labels:", error);
      setLabels([]);
    } finally {
      setIsLabelsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLabels();

    //LISTEN for updates from Sidebar
    const handleUpdate = () => {
      loadLabels();
    };

    window.addEventListener("labelsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("labelsUpdated", handleUpdate);
    };
  }, [loadLabels]);

  const handleDelete = async (id: number) => {
    await deleteLabel(id);
    window.dispatchEvent(new Event("labelsUpdated"));
    await loadLabels();
  };

  //Start editing
  const handleEdit = (label: Label) => {
    setEditingId(label.id);
    setNewName(label.name);
  };

  //Save updated label
  const handleUpdate = async (id: number) => {
    if (!newName.trim()) return;

    await updateLabel(id, newName);
    window.dispatchEvent(new Event("labelsUpdated"));

    setEditingId(null);
    setNewName("");

    await loadLabels();
  };

  return (
    <main className="max-w-5xl mx-auto p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Manage Labels
      </h1>

      <div className="space-y-3">
        {isLabelsLoading ? (
          <LoadingState message="Loading labels..." />
        ) : labels.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/80 p-8 text-center text-sm text-gray-500">
            No labels available
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {labels.map((label) => (
              <div
                key={label.id}
                className="relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                {editingId === label.id ? (
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-sm font-medium px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {label.name}
                  </p>
                )}

                <div className="flex flex-wrap justify-end items-center gap-2 mt-4">
                  {editingId === label.id ? (
                    <button
                      onClick={() => handleUpdate(label.id)}
                      className="text-xs font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg px-3 py-2 hover:-translate-y-1 transition-all duration-200"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(label)}
                      className="text-xs hover:-translate-y-1 transition-all duration-200 bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-lg"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(label.id)}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg hover:-translate-y-1 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
