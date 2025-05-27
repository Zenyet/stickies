import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NotesState, Note } from "@/types";
import { DEFAULT_TITLE } from "@/constants";
import { createNote, createDeletedNote, limitDeletedNotes } from "@/utils";
import { serialize, deserialize } from "./serialization";

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      // 初始状态
      notes: [],
      recentDeletedNotes: [],
      isEditorOpen: false,
      selectedNote: null,

      // 笔记操作
      addNote: (title: string, content: string) => {
        const newNote = createNote(title, content);
        set((state) => ({
          notes: [newNote, ...state.notes],
          isEditorOpen: false,
          selectedNote: null,
        }));
      },

      updateNote: (id: string, title: string, content: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, title: title || DEFAULT_TITLE, content }
              : note
          ),
          isEditorOpen: false,
          selectedNote: null,
        }));
      },

      deleteNote: (id: string) => {
        const { selectedNote, notes, recentDeletedNotes } = get();
        const noteToDelete = notes.find((note) => note.id === id);

        if (!noteToDelete) return;

        const deletedNote = createDeletedNote(noteToDelete);
        const updatedDeletedNotes = limitDeletedNotes([
          deletedNote,
          ...recentDeletedNotes,
        ]);

        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          recentDeletedNotes: updatedDeletedNotes,
          isEditorOpen: selectedNote?.id === id ? false : state.isEditorOpen,
          selectedNote: selectedNote?.id === id ? null : selectedNote,
        }));
      },

      restoreNote: (id: string) => {
        const { recentDeletedNotes } = get();
        const noteToRestore = recentDeletedNotes.find((note) => note.id === id);

        if (!noteToRestore) return;

        const { deletedAt, ...restoredNote } = noteToRestore;

        set((state) => ({
          notes: [restoredNote, ...state.notes],
          recentDeletedNotes: state.recentDeletedNotes.filter(
            (note) => note.id !== id
          ),
        }));
      },

      permanentlyDeleteNote: (id: string) => {
        set((state) => ({
          recentDeletedNotes: state.recentDeletedNotes.filter(
            (note) => note.id !== id
          ),
        }));
      },

      clearDeletedNotes: () => {
        set({ recentDeletedNotes: [] });
      },

      // 编辑器操作
      setSelectedNote: (note: Note | null) => {
        set({ selectedNote: note });
      },

      setEditorOpen: (open: boolean) => {
        set({ isEditorOpen: open });
      },

      openEditor: (note?: Note) => {
        set({
          selectedNote: note || null,
          isEditorOpen: true,
        });
      },

      closeEditor: () => {
        set({
          isEditorOpen: false,
          selectedNote: null,
        });
      },
    }),
    {
      name: "notes-storage",
      serialize,
      deserialize,
    }
  )
);
