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

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  const fetchLabels = async () => {
    const res = await getLabels();
    setLabels(res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      const notesRes = await getNotes();
      setNotes(notesRes.data);

      const labelsRes = await getLabels();
      setLabels(labelsRes.data);
    };

    loadData();
  }, []);

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
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Notes</h1>

      <NoteForm onNoteCreated={fetchNotes} labels={labels} />

      <NotesList notes={notes} refreshNotes={fetchNotes} />
    </main>
  );
}
