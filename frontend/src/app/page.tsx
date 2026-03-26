"use client";

import { useEffect, useState } from "react";
import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";
import { getNotes } from "@/services/api";
import { type Note } from "@/types/note";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    let isMounted = true;

    getNotes().then((response) => {
      if (isMounted) {
        setNotes(response.data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Notes</h1>

      <NoteForm
        onNoteCreated={(note) =>
          setNotes((current) => [{ ...note, labels: [] }, ...current])
        }
      />
      <NotesList notes={notes} />
    </div>
  );
}
