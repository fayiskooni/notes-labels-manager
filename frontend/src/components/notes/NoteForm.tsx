"use client";

import { useState } from "react";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
          Create Note
        </button>
      </div>
    </div>
  );
}