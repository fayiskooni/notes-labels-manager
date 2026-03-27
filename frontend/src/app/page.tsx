"use client";

import { useEffect, useState } from "react";
import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";

import { getLabels, getNotes, getNotesByLabel } from "@/services/api";

import { type Note } from "@/types/note";
import { type Label } from "@/types/label";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const fetchNotes = async () => {
    const res =
      selectedLabels.length > 0
        ? await getNotesByLabel(selectedLabels)
        : await getNotes();

    setNotes(res.data);
  };

  const fetchLabels = async () => {
    const res = await getLabels();
    setLabels(res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      const labelsRes = await getLabels();
      setLabels(labelsRes.data);
    };

    loadData();
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadNotes = async () => {
      const res =
        selectedLabels.length > 0
          ? await getNotesByLabel(selectedLabels)
          : await getNotes();

      if (isActive) {
        setNotes(res.data);
      }
    };

    loadNotes();

    return () => {
      isActive = false;
    };
  }, [selectedLabels]);

  useEffect(() => {
    const handleUpdate = () => {
      fetchLabels();
    };

    window.addEventListener("labelsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("labelsUpdated", handleUpdate);
    };
  }, []);

  return (
    <main className="max-w-5xl mx-auto p-2 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        All Notes
      </h1>

      <NoteForm onNoteCreated={fetchNotes} labels={labels} />

      <div className="relative mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex-1 h-px bg-gray-300" />

          <button
            onClick={() => setShowFilters((current) => !current)}
            className="shrink-0 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
          >
            Filter
            {selectedLabels.length > 0 ? ` (${selectedLabels.length})` : ""}
          </button>
        </div>

        {showFilters ? (
          <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex gap-2 flex-wrap">
              {labels.map((label) => (
                <button
                  key={label.id}
                  onClick={() =>
                    setSelectedLabels((current) =>
                      current.includes(label.id)
                        ? current.filter((id) => id !== label.id)
                        : [...current, label.id],
                    )
                  }
                  className={`px-3 py-2 rounded-full text-sm border transition-all duration-200 ${
                    selectedLabels.includes(label.id)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {label.name}
                </button>
              ))}
            </div>

            {selectedLabels.length > 0 ? (
              <button
                onClick={() => setSelectedLabels([])}
                className="mt-4 text-sm text-gray-500 hover:text-blue-600"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <NotesList notes={notes} labels={labels} refreshNotes={fetchNotes} />
    </main>
  );
}
