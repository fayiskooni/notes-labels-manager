import { ApiResponse } from "@/types/api";
import { Label } from "@/types/label";
import { Note, UpdateNotePayload } from "@/types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getNotes = async (): Promise<ApiResponse<Note[]>> => {
  const res = await fetch(`${BASE_URL}/notes`);
  return res.json();
};

export const createNote = async (data: {
  title: string;
  content: string;
}): Promise<ApiResponse<Note>> => {
  const res = await fetch(`${BASE_URL}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getLabels = async (): Promise<ApiResponse<Label[]>> => {
  const res = await fetch(`${BASE_URL}/labels`);
  return res.json();
};

export const attachLabels = async (noteId: number, labelIds: number[]) => {
  const res = await fetch(`${BASE_URL}/note/${noteId}/label`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ labelIds }),
  });

  return res.json();
};

export const getNote = async (id: number) => {
  const res = await fetch(`${BASE_URL}/note/${id}`);
  return res.json();
};

export const removeLabel = async (noteId: number, labelId: number) => {
  const res = await fetch(`${BASE_URL}/note/${noteId}/label`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ labelId }),
  });

  return res.json();
};

export const createLabel = (name: string) =>
  fetch(`${BASE_URL}/label`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());

export const updateLabel = (id: number, name: string) =>
  fetch(`${BASE_URL}/label/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

export const deleteLabel = (id: number) =>
  fetch(`${BASE_URL}/label/${id}`, { method: "DELETE" });

export const updateNote = (id: number, data: UpdateNotePayload) =>
  fetch(`${BASE_URL}/note/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteNote = (id: number) =>
  fetch(`${BASE_URL}/note/${id}`, { method: "DELETE" });

export const getNotesByLabel = (labelIds: number[]) =>
  fetch(`${BASE_URL}/notes/filter?labelIds=${labelIds.join(",")}`).then((res) =>
    res.json(),
  );
