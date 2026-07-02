"use client";

import { AAlertDialog } from "@/components/modal/AAlertDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit3, MoreHorizontal, Trash2 } from "lucide-react";

export interface LevelItem {
  id: string;
  name: string;
  index?: number;
  image?: string;
}

interface LevelCardProps {
  level: LevelItem;
  onEdit: (level: LevelItem) => void;
  onDelete: (level: LevelItem) => void;
}

const LevelCard = ({ level, onEdit, onDelete }: LevelCardProps) => {
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-background px-5 py-6">
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
                onClick={() => onEdit(level)}
                className="cursor-pointer"
              >
                <Edit3 className="size-4" />
                Edit
              </DropdownMenuItem>
              <AAlertDialog
                title="Delete level?"
                description={`This will permanently remove the level and the chapters, lessons and questions under it`}
                cancelText="Keep level"
                actionText="Delete"
                onAction={() => onDelete(level)}
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

        <div className="flex min-h-[260px] items-center justify-center rounded-[18px] bg-black/20 p-4">
          <img
            src={level.image || "/window.svg"}
            alt={level.name}
            className="max-h-[220px] w-full rounded-xl object-contain"
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-[24px] leading-none font-semibold text-white">
          {level.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">Index {level.index}</p>
      </div>
    </div>
  );
};

export default LevelCard;
