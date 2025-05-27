import { NOTE_COLORS, DEFAULT_TITLE, MAX_DELETED_NOTES } from "@/constants";
import { Note, DeletedNote } from "@/types";

export const createNote = (title: string, content: string): Note => ({
  id: Date.now().toString(),
  title: title || DEFAULT_TITLE,
  content,
  createdAt: new Date(),
  color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
});

export const createDeletedNote = (note: Note): DeletedNote => ({
  ...note,
  deletedAt: new Date(),
});

export const limitDeletedNotes = (
  deletedNotes: DeletedNote[]
): DeletedNote[] => {
  return deletedNotes.length > MAX_DELETED_NOTES
    ? deletedNotes.slice(0, MAX_DELETED_NOTES)
    : deletedNotes;
};
