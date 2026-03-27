"use client";

import { useEffect, useState } from "react";
import { getLabels, deleteLabel, updateLabel } from "@/services/api";
import { type Label } from "@/types/label";

export default function LabelsPage() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const loadLabels = async () => {
      const res = await getLabels();
      setLabels(res.data);
    };

    loadLabels();

    //LISTEN for updates from Sidebar
    const handleUpdate = () => {
      loadLabels();
    };

    window.addEventListener("labelsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("labelsUpdated", handleUpdate);
    };
  }, []);

  const handleDelete = async (id: number) => {
    await deleteLabel(id);
    window.dispatchEvent(new Event("labelsUpdated"));

    const res = await getLabels();
    setLabels(res.data);
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

    // refresh list
    const res = await getLabels();
    setLabels(res.data);
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Labels</h1>

      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

              <div className="flex justify-end items-center gap-2 mt-4">
                {editingId === label.id ? (
                  <button
                    onClick={() => handleUpdate(label.id)}
                    className="text-xs font-medium text-green-600 hover:text-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(label)}
                    className="text-xs text-gray-500 hover:text-blue-600 hover:-translate-y-1 transition-all duration-200"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(label.id)}
                  className="text-xs text-red-500 hover:text-red-300 hover:-translate-y-1 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
