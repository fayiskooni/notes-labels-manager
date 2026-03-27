"use client";

import { useEffect, useState } from "react";
import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";

import { getNotes, getLabels } from "@/services/api";

import { type Note } from "@/types/note";
import { type Label } from "@/types/label";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getNotes();
      setNotes(res.data);
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await getLabels();
      setLabels(res.data);
    };

    fetch();

    const handleUpdate = () => fetch();

    window.addEventListener("labelsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("labelsUpdated", handleUpdate);
    };
  }, []);

  // Refresh notes (after create/delete/update)
  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Notes</h1>

        <NoteForm onNoteCreated={fetchNotes} labels={labels} />

        <NotesList notes={notes} refreshNotes={fetchNotes} />
      </main>
    </div>
  );
}
