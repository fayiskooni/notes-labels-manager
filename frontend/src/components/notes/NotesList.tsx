"use client";

import { Note } from "@/types/note";
import { removeLabel } from "@/services/api";

type NotesListProps = {
  notes: Note[];
  refreshNotes: () => Promise<void>;
};

export default function NotesList({ notes, refreshNotes }: NotesListProps) {

  const handleRemoveLabel = async (noteId: number, labelId: number) => {
    await removeLabel(noteId, labelId);
    await refreshNotes();
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <h2 className="font-semibold text-lg">{note.title}</h2>
          <p className="text-gray-600 mt-2">{note.content}</p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {note.labels?.map((label) => (
              <span
                key={label.id}
                onClick={() => handleRemoveLabel(note.id, label.id)}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                {label.name} ✕
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
