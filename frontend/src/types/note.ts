import { Label } from "./label";

export type Note = {
  id: number;
  title: string;
  content: string;
  labels?: Label[];
  created_at?: string;
};

export type NoteInput = {
  title: string;
  content: string;
};

export type UpdateNotePayload = Partial<NoteInput>;