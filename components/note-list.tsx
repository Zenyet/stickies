"use client";

import type { Note } from "@/types";

interface NoteListProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
  selectedNoteId?: string;
}

export function NoteList({
  notes,
  onNoteSelect,
  selectedNoteId,
}: NoteListProps) {
  return (
    <div className="w-full">
      {notes.slice(0, 10).map((note) => (
        <div
          key={note.id}
          className={`m-8 w-[240px] h-[240px] p-0 bg-[#b19cd9] hover:bg-[#a088d1] border-0 rounded-none shadow-md ${
            selectedNoteId === note.id ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => onNoteSelect(note)}
        >
          <div className="w-full h-full flex items-start justify-start p-4">
            <span className="text-white font-medium text-sm">
              {note.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
