"use client";

import { type Note } from "@/services/api";

type NotesListProps = {
  notes: Note[];
};

export default function NotesList({ notes }: NotesListProps) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white p-5 rounded-xl shadow-sm border"
        >
          <h2 className="font-semibold text-lg">{note.title}</h2>
          <p className="text-gray-600 mt-2">{note.content}</p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {note.labels?.map((label: string, i: number) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
