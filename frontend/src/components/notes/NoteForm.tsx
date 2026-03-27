"use client";

import { useState } from "react";

import { createNote, attachLabels } from "@/services/api";
import LabelSelector from "@/components/labels/LabelSelector";
import { type Label } from "@/types/label";

type NoteFormProps = {
  onNoteCreated: () => Promise<void>;
  labels: Label[];
};

export default function NoteForm({ onNoteCreated, labels }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    const res = await createNote({
      title: title.trim(),
      content: content.trim(),
    });

    const newNote = res.data;

    if (selectedLabels.length > 0) {
      await attachLabels(newNote.id, selectedLabels);
    }

    // refresh full notes list
    await onNoteCreated();

    setTitle("");
    setContent("");
    setSelectedLabels([]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full text-lg font-semibold outline-none mb-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full text-gray-600 outline-none resize-none mb-4"
      />
      <LabelSelector
        labels={labels}
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg"
        >
          Create Note
        </button>
      </div>
    </div>
  );
}
