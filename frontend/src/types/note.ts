import { Label } from "./label";

export type Note = {
  id: number;
  title: string;
  content: string;
  labels?: Label[];
  created_at?: string;
};
