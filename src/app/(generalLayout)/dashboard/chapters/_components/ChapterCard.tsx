"use client";

import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit3, MoreHorizontal, Trash2 } from "lucide-react";

export interface ChapterItem {
  id: string;
  name: string;
  level: string;
  index: string;
  imageSrc: string;
}

interface ChapterCardProps {
  chapter: ChapterItem;
  onEdit: (chapter: ChapterItem) => void;
  onDelete: (chapter: ChapterItem) => void;
}

const ChapterCard = ({ chapter, onEdit, onDelete }: ChapterCardProps) => {
  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-background px-5 py-5">
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full text-white hover:bg-white/8 hover:text-white"
              >
                <MoreHorizontal className="size-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-40 border-border bg-card text-white"
            >
              <DropdownMenuItem
                onClick={() => onEdit(chapter)}
                className="cursor-pointer"
              >
                <Edit3 className="size-4" />
                Edit
              </DropdownMenuItem>

              <AAlertDialog
                title="Delete chapter?"
                description={`This will permanently remove ${chapter.name}. This action cannot be undone.`}
                cancelText="Keep chapter"
                actionText="Delete"
                onAction={() => onDelete(chapter)}
              >
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onSelect={(event) => event.preventDefault()}
                >
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </AAlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex h-full items-center justify-center rounded-[18px] bg-black/20">
          <img
            src={chapter.imageSrc}
            alt={chapter.name}
            className="h-[120px] w-[120px] object-contain"
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-[20px] leading-none font-semibold text-white">
          {chapter.name}
        </h3>
      </div>
    </div>
  );
};

export default ChapterCard;
