export type Note = {
  id: number;
  title: string;
  content: string;
  labels?: string[];
  created_at?: string;
};