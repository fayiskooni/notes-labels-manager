"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Note } from "@/types/note";
import { Label } from "@/types/label";
import { attachLabels, removeLabel } from "@/services/api";

type NotesListProps = {
  notes: Note[];
  labels: Label[];
  refreshNotes: () => Promise<void>;
};

export default function NotesList({
  notes,
  labels,
  refreshNotes,
}: NotesListProps) {
  const router = useRouter();
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);

  const handleRemoveLabel = async (noteId: number, labelId: number) => {
    await removeLabel(noteId, labelId);
    await refreshNotes();
  };

  const handleAttachLabel = async (noteId: number, labelId: number) => {
    await attachLabels(noteId, [labelId]);
    setActiveNoteId(null);
    await refreshNotes();
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => router.push(`/note/${note.id}`)}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        >
          <h2 className="font-semibold text-lg">{note.title}</h2>
          <p className="text-gray-600 mt-2">{note.content}</p>

          <div className="flex gap-2 mt-4 flex-wrap items-center">
            {note.labels?.map((label) => (
              <span
                key={label.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveLabel(note.id, label.id);
                }}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                {label.name} ✕
              </span>
            ))}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveNoteId((current) =>
                  current === note.id ? null : note.id,
                );
              }}
              className="h-6 w-6 rounded-full bg-gray-100 text-sm font-semibold text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
            >
              +
            </button>
          </div>

          {activeNoteId === note.id ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex gap-2 flex-wrap"
            >
              {labels
                .filter(
                  (label) =>
                    !note.labels?.some((noteLabel) => noteLabel.id === label.id),
                )
                .map((label) => (
                  <button
                    key={label.id}
                    onClick={() => handleAttachLabel(note.id, label.id)}
                    className="px-2 py-1 rounded text-xs border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  >
                    {label.name}
                  </button>
                ))}

              {labels.filter(
                (label) =>
                  !note.labels?.some((noteLabel) => noteLabel.id === label.id),
              ).length === 0 ? (
                <p className="text-xs text-gray-400">All labels already added</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
