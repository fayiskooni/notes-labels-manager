const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type Note = {
  id: number;
  title: string;
  content: string;
  labels?: string[];
  created_at?: string;
};

type NotesResponse = {
  success: boolean;
  data: Note[];
};

type NoteResponse = {
  success: boolean;
  data: Note;
};

export const getNotes = async (): Promise<NotesResponse> => {
  const res = await fetch(`${BASE_URL}/notes`);
  return res.json();
};

export const createNote = async (data: {
  title: string;
  content: string;
}): Promise<NoteResponse> => {
  const res = await fetch(`${BASE_URL}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
