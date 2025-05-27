"use client";

import { NoteList } from "@/components/note-list";
import { NoteCard } from "@/components/note-card";
import { NoteEditorDialog } from "@/components/note-editor-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNotesStore } from "@/store";

export default function NotesApp() {
  const {
    notes,
    isEditorOpen,
    selectedNote,
    addNote,
    updateNote,
    deleteNote,
    openEditor,
    closeEditor,
    recentDeletedNotes,
  } = useNotesStore();

  const handleSave = (title: string, content: string) => {
    if (selectedNote) {
      updateNote(selectedNote.id, title, content);
    } else {
      addNote(title, content);
    }
  };

  return (
    <div className="flex my-[45px] mx-[40px] h-[calc(100vh-90px)] overflow-hidden">
      {/* 左边栏 */}
      <div className="bg-[#e6d7ff] rounded-md h-full relative">
        <div className="overflow-auto flex h-[calc(100%-88px)] flex-col gap-4 w-[304px] overflow-auto">
          <NoteList
            notes={notes}
            onNoteSelect={openEditor}
            selectedNoteId={selectedNote?.id}
          />
        </div>

        {/* 新增按钮 */}
        <div className="p-4 absolute bottom-0 w-full">
          <Button
            onClick={() => openEditor()}
            className="w-full bg-transparent hover:bg-white/10 text-gray-700 font-medium text-left justify-start p-3 h-auto border-0 shadow-none"
            variant="ghost"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
              <span>Add notes</span>
            </div>
          </Button>
        </div>
      </div>

      {/* 中间区域 */}
      <div className="flex-1 p-8 mx-8 bg-[#f5f1e8] rounded-md">
        <NoteEditorDialog
          note={selectedNote}
          isOpen={isEditorOpen}
          onOpenChange={(open) => {
            if (!open) closeEditor();
          }}
          onSave={handleSave}
          onDelete={
            selectedNote ? () => deleteNote(selectedNote.id) : undefined
          }
        />
        <div className="grid grid-cols-3 gap-8">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => openEditor(note)}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </div>
      </div>

      {/* 右边栏 */}
      <div className="w-64 bg-gray-50 flex flex-col rounded-md overflow-auto">
        {(recentDeletedNotes || []).map((note, index) => (
          <div className="h-32 bg-gray-300 p-4 my-4 mx-8 shadow-md" key={index}>
            {note.content}
          </div>
        ))}
      </div>
    </div>
  );
}
