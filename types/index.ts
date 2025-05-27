export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  color: string;
}

export interface DeletedNote extends Note {
  deletedAt: Date;
}

export interface NotesState {
  notes: Note[];
  recentDeletedNotes: DeletedNote[];
  isEditorOpen: boolean;
  selectedNote: Note | null;

  // 笔记操作
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  restoreNote: (id: string) => void;
  permanentlyDeleteNote: (id: string) => void;
  clearDeletedNotes: () => void;

  // 编辑器操作
  setSelectedNote: (note: Note | null) => void;
  setEditorOpen: (open: boolean) => void;
  openEditor: (note?: Note) => void;
  closeEditor: () => void;
}
