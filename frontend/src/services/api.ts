import { ApiResponse } from "@/types/api";
import { Label } from "@/types/label";
import { Note } from "@/types/note";

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