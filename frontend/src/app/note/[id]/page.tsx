"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { deleteNote, getSingleNote, updateNote } from "@/services/api";
import { type Note } from "@/types/note";

export default function SingleNotePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const noteId = Number(params.id);

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!noteId) return;

    const loadNote = async () => {
      const res = await getSingleNote(noteId);
      setNote(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    };

    loadNote();
  }, [noteId]);

  const handleUpdate = async () => {
    if (!note) return;

    const res = await updateNote(note.id, {
      title: title.trim(),
      content: content.trim(),
    });

    setNote({
      ...note,
      ...res.data,
      labels: note.labels ?? [],
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!note) return;

    await deleteNote(note.id);
    router.push("/");
  };

  if (!note) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <p className="text-sm text-gray-500">Loading note...</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6"
      >
        ← Back to notes
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold outline-none"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-gray-600 outline-none resize-none mt-4"
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>
            <p className="text-gray-600 mt-4 whitespace-pre-wrap">
              {note.content}
            </p>
          </>
        )}

        <div className="flex gap-2 mt-6 flex-wrap">
          {note.labels?.map((label) => (
            <span
              key={label.id}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
            >
              {label.name}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              disabled={!title.trim() || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg hover:-translate-y-1 transition-all duration-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-900 hover:bg-gray-700 text-white px-5 py-2 rounded-lg hover:-translate-y-1 transition-all duration-200"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg hover:-translate-y-1 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}
