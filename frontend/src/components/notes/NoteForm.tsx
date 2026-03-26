"use client";

import { useState } from "react";

import { createNote} from "@/services/api";
import { type Note } from "@/types/note";
import LabelSelector from "@/components/labels/LabelSelector";

type NoteFormProps = {
  onNoteCreated: (note: Note) => void;
};

export default function NoteForm({ onNoteCreated }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);

  const handleSubmit = async () => {
    if (!title || !content) return;

    const response = await createNote({ title, content });

    onNoteCreated({
      ...response.data,
      labels: response.data.labels ?? [],
    });

    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
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
