"use client";

import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        All Notes
      </h1>

      <NoteForm />
      <NotesList />
    </div>
  );
}