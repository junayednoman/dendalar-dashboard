"use client";

import { useEffect, useMemo, useState } from "react";
import AErrorMessage from "@/components/AErrorMessage";
import handleMutation from "@/utils/handleMutation";
import { Button } from "@/components/ui/button";
import ASpinner from "@/components/ui/ASpinner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import ChapterCard, { ChapterItem } from "./ChapterCard";
import ChapterFormModal, { ChapterFormValues } from "./ChapterFormModal";
import {
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useGetChaptersQuery,
  useUpdateChapterMutation,
} from "@/redux/api/chaptersApi";
import { useGetLevelsQuery } from "@/redux/api/levelsApi";

type ChapterApiItem = {
  id: string;
  name: string;
  index: number;
  levelId: string;
  createdAt: string;
  updatedAt: string;
  level?: {
    id: string;
    name: string;
    index: number;
  };
  lessons?: {
    id: string;
    index: number;
    lessonType: string;
    chapterId: string;
  }[];
};

type LevelOption = {
  label: string;
  value: string;
};

const ChaptersContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<ChapterApiItem | null>(
    null,
  );
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetChaptersQuery(selectedLevel);
  const { data: levelsData } = useGetLevelsQuery(undefined);
  const [createChapter, { isLoading: isCreating }] = useCreateChapterMutation();
  const [updateChapter, { isLoading: isUpdating }] = useUpdateChapterMutation();
  const [deleteChapter] = useDeleteChapterMutation();
  const chapters: ChapterApiItem[] = data?.data || [];
  const levelOptions: LevelOption[] = (levelsData?.data || []).map((level: any) => ({
    label: `${level.name}`,
    value: level.id,
  }));

  useEffect(() => {
    if (!selectedLevel && levelOptions.length) {
      setSelectedLevel(levelOptions[0].value);
    }
  }, [levelOptions, selectedLevel]);

  const filteredChapters = useMemo(() => {
    return chapters.filter((chapter) => {
      const matchesSearch = chapter.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [chapters, searchTerm]);

  const handleCreateChapter = async (values: ChapterFormValues) => {
    await handleMutation(values, createChapter, "Creating chapter...", () => {
      setIsCreateOpen(false);
    });
  };

  const handleEditChapter = async (values: ChapterFormValues) => {
    if (!editingChapter) return;

    await handleMutation(
      { id: editingChapter.id, data: values },
      updateChapter,
      "Updating chapter...",
      () => {
        setEditingChapter(null);
      },
    );
  };

  const handleDeleteChapter = async (chapter: ChapterItem) => {
    await handleMutation(chapter.id, deleteChapter, "Deleting chapter...");
  };

  const handleOpenEditChapter = (chapter: ChapterItem) => {
    setEditingChapter(chapter as ChapterApiItem);
  };

  return (
    <>
      <div className="space-y-10 pt-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Type to search"
              className="h-12 rounded-xl border-border bg-card pl-12 text-white"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="h-12! min-w-35 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {levelOptions.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-12 rounded-xl px-5 text-sm"
            >
              Add new chapter
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <ASpinner size={120} className="min-h-[320px]" />
        ) : isError ? (
          <AErrorMessage error={error} onRetry={refetch} className="min-h-[320px]" />
        ) : filteredChapters.length ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredChapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                onEdit={handleOpenEditChapter}
                onDelete={handleDeleteChapter}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-dashed border-border bg-card/40 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">
                No chapters found
              </h3>
              <p className="text-card-foreground">
                Try another search or create a new chapter.
              </p>
            </div>
          </div>
        )}
      </div>

      <ChapterFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateChapter}
        defaultValues={{
          name: "",
          levelId: selectedLevel,
          index: 1,
        }}
        title="Add New Chapter"
        description="Add new chapter within a specific level"
        submitLabel={isCreating ? "Submitting..." : "Submit"}
        levelOptions={levelOptions}
      />

      <ChapterFormModal
        key={editingChapter?.id ?? "edit-chapter"}
        open={!!editingChapter}
        onOpenChange={(open) => {
          if (!open) setEditingChapter(null);
        }}
        onSubmit={handleEditChapter}
        defaultValues={{
          name: editingChapter?.name ?? "",
          levelId: editingChapter?.levelId ?? "",
          index: editingChapter?.index ?? 1,
        }}
        title="Update Chapter"
        description="Update the chapter details within a specific level"
        submitLabel={isUpdating ? "Updating..." : "Update"}
        levelOptions={levelOptions}
      />
    </>
  );
};

export default ChaptersContainer;
