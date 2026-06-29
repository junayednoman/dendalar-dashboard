"use client";

import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookText,
  Edit3,
  MessageCircleMore,
  MoreHorizontal,
  RotateCcw,
  Trash2,
} from "lucide-react";

export interface LessonItem {
  id: string;
  lessonType: string;
  chapterId: string;
  index: number;
  chapter?: {
    id: string;
    name: string;
    index: number;
    levelId: string;
  };
}

interface LessonCardProps {
  lesson: LessonItem;
  onEdit: (lesson: LessonItem) => void;
  onDelete: (lesson: LessonItem) => void;
}

const lessonIconMap = {
  SENTENCE: BookText,
  DIALOGUE: MessageCircleMore,
} as const;

const LessonCard = ({ lesson, onEdit, onDelete }: LessonCardProps) => {
  const Icon = lessonIconMap[lesson.lessonType as keyof typeof lessonIconMap];

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
                onClick={() => onEdit(lesson)}
                className="cursor-pointer"
              >
                <Edit3 className="size-4" />
                Edit
              </DropdownMenuItem>

              <AAlertDialog
                title="Delete lesson?"
                description={`This will permanently remove ${lesson.lessonType} lesson ${lesson.index}. This action cannot be undone.`}
                cancelText="Keep lesson"
                actionText="Delete"
                onAction={() => onDelete(lesson)}
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
          {Icon ? (
            <Icon className="size-16 text-white" strokeWidth={1.75} />
          ) : null}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-[20px] leading-none font-semibold text-white">
          {lesson.lessonType}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {lesson.chapter?.name
            ? `${lesson.chapter.name} • Lesson ${lesson.index}`
            : `Lesson ${lesson.index}`}
        </p>
      </div>
    </div>
  );
};

export default LessonCard;
