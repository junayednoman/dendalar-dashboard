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

export interface QuestionItem {
  id: string;
  chapterId: string;
  lessonId: string;
  sentenceInEnglish: string | null;
  sentenceInLearningLanguage: string | null;
  hint: string | null;
  fullSentence: string | null;
  missingWord: string | null;
  index: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  chapter?: {
    id: string;
    name: string;
    index: number;
  };
  lesson?: {
    id: string;
    index: number;
    lessonType: string;
  };
}

interface QuestionCardProps {
  question: QuestionItem;
  onEdit: (question: QuestionItem) => void;
  onDelete: (question: QuestionItem) => void;
}

const QuestionCard = ({ question, onEdit, onDelete }: QuestionCardProps) => {
  const previewText =
    question.type === "SENTENCE"
      ? question.sentenceInEnglish || "No sentence"
      : question.fullSentence || "No dialogue sentence";

  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-primary">{question.type}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            {previewText}
          </h3>
        </div>

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
              onClick={() => onEdit(question)}
              className="cursor-pointer"
            >
              <Edit3 className="size-4" />
              Edit
            </DropdownMenuItem>

            <AAlertDialog
              title="Delete question?"
              description="This will permanently remove the question. This action cannot be undone."
              cancelText="Keep question"
              actionText="Delete"
              onAction={() => onDelete(question)}
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

      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          Chapter: <span className="text-white">{question.chapter?.name || "-"}</span>
        </p>
        <p>
          Lesson: <span className="text-white">{question.lesson?.lessonType || "-"}</span>
        </p>
        <p>
          Index: <span className="text-white">{question.index}</span>
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
