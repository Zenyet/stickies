"use client";
import { Card } from "@/components/ui/card";
import type { Note } from "@/types";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onDelete: () => void;
}

const cardColors = [
  "bg-[#ff9999]",
  "bg-[#66ccff]",
  "bg-[#66dd99]",
  "bg-[#ff9999]",
];

export function NoteCard({ note, onClick }: NoteCardProps) {
  const colorIndex = Number.parseInt(note.id) % cardColors.length;
  const bgColor = cardColors[colorIndex];

  return (
    <Card
      className={`${bgColor} border-0 rounded-none w-[240px] h-[240px] shadow-md`}
      onClick={onClick}
    >
      <div className="flex justify-start p-4">
        <span className="text-gray-800 font-medium text-sm">
          {note.content}
        </span>
      </div>
    </Card>
  );
}
