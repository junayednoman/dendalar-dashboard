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
import LessonCard, { LessonItem } from "./LessonCard";
import LessonFormModal, { LessonFormValues } from "./LessonFormModal";
import { useGetChaptersQuery } from "@/redux/api/chaptersApi";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonsQuery,
  useUpdateLessonMutation,
} from "@/redux/api/lessonsApi";
import { useGetLevelsQuery } from "@/redux/api/levelsApi";

const lessonTypeOptions = ["SENTENCE", "DIALOGUE"];

type LessonApiItem = {
  id: string;
  index: number;
  lessonType: string;
  chapterId: string;
  chapter?: {
    id: string;
    name: string;
    index: number;
    levelId: string;
  };
};

const LessonsContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonApiItem | null>(
    null,
  );

  const { data: levelsData } = useGetLevelsQuery(undefined);
  const levels = levelsData?.data || [];

  useEffect(() => {
    if (!selectedLevel && levels.length) {
      setSelectedLevel(levels[0].id);
    }
  }, [levels, selectedLevel]);
  const { data: chaptersData } = useGetChaptersQuery(selectedLevel);
  const { data: allChaptersData } = useGetChaptersQuery(undefined);
  const chapters = chaptersData?.data || [];
  const allChapters = allChaptersData?.data || [];

  useEffect(() => {
    if (!selectedLevel) return;

    if (!chapters.length) {
      setSelectedChapter("");
      return;
    }

    const hasSelectedChapter = chapters.some(
      (chapter: any) => chapter.id === selectedChapter,
    );

    if (!hasSelectedChapter) {
      setSelectedChapter(chapters[0].id);
    }
  }, [chapters, selectedChapter, selectedLevel]);

  const { data, isLoading, isError, error, refetch } =
    useGetLessonsQuery(selectedChapter);

  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const lessons: LessonApiItem[] = data?.data || [];

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) =>
      `${lesson.lessonType} ${lesson.chapter?.name || ""} ${lesson.index}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [lessons, searchTerm]);

  const chapterOptions = chapters.map((chapter: any) => ({
    label: chapter.name,
    value: chapter.id,
    levelId: chapter.levelId,
  }));

  const levelOptions = levels.map((level: any) => ({
    label: level.name,
    value: level.id,
  }));

  const createDefaultValues = useMemo(
    () => ({
      levelId: selectedLevel,
      lessonType: "",
      chapterId: selectedChapter,
      index: 1,
    }),
    [selectedChapter, selectedLevel],
  );

  const editDefaultValues = useMemo(
    () => ({
      levelId:
        editingLesson?.chapter?.levelId ??
        allChapters.find((chapter: any) => chapter.id === editingLesson?.chapterId)
          ?.levelId ??
        selectedLevel,
      lessonType: editingLesson?.lessonType ?? "",
      chapterId: editingLesson?.chapterId ?? "",
      index: editingLesson?.index ?? 1,
    }),
    [allChapters, editingLesson, selectedLevel],
  );

  const handleCreateLesson = async (values: LessonFormValues) => {
    await handleMutation(
      {
        lessonType: values.lessonType,
        chapterId: values.chapterId,
        index: values.index,
      },
      createLesson,
      "Creating lesson...",
      () => {
        setIsCreateOpen(false);
      },
    );
  };

  const handleEditLesson = async (values: LessonFormValues) => {
    if (!editingLesson) return;

    await handleMutation(
      {
        id: editingLesson.id,
        data: {
          lessonType: values.lessonType,
          index: values.index,
          chapterId: values.chapterId,
        },
      },
      updateLesson,
      "Updating lesson...",
      () => {
        setEditingLesson(null);
      },
    );
  };

  const handleDeleteLesson = async (lesson: LessonItem) => {
    await handleMutation(lesson.id, deleteLesson, "Deleting lesson...");
  };

  const handleOpenEditLesson = (lesson: LessonItem) => {
    setEditingLesson(lesson as LessonApiItem);
  };

  return (
    <>
      <div className="space-y-10 pt-8">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Type to search"
              className="h-12 rounded-xl border-border bg-card pl-12 text-white"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap xl:flex-nowrap">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="h-12! min-w-30 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {levelOptions.map((level: { label: string; value: string }) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedChapter} onValueChange={setSelectedChapter}>
              <SelectTrigger className="h-12! min-w-35 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Chapter" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {chapterOptions.map(
                  (chapter: { label: string; value: string }) => (
                    <SelectItem key={chapter.value} value={chapter.value}>
                      {chapter.label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>

            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-12 rounded-xl px-5 text-sm"
            >
              Add new lesson
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <ASpinner size={120} className="min-h-[320px]" />
        ) : isError ? (
          <AErrorMessage
            error={error}
            onRetry={refetch}
            className="min-h-[320px]"
          />
        ) : filteredLessons.length ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onEdit={handleOpenEditLesson}
                onDelete={handleDeleteLesson}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-dashed border-border bg-card/40 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">
                No lessons found
              </h3>
              <p className="text-card-foreground">
                Try another search or create a new lesson.
              </p>
            </div>
          </div>
        )}
      </div>

      <LessonFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateLesson}
        defaultValues={createDefaultValues}
        title="Add New Lesson"
        description="Add new lesson within a specific level"
        submitLabel={isCreating ? "Submitting..." : "Submit"}
        levelOptions={levelOptions}
        lessonTypeOptions={lessonTypeOptions}
      />

      <LessonFormModal
        key={editingLesson?.id ?? "edit-lesson"}
        open={!!editingLesson}
        onOpenChange={(open) => {
          if (!open) setEditingLesson(null);
        }}
        onSubmit={handleEditLesson}
        defaultValues={editDefaultValues}
        title="Update Lesson"
        description="Update lesson details within a specific level"
        submitLabel={isUpdating ? "Updating..." : "Update"}
        levelOptions={levelOptions}
        lessonTypeOptions={lessonTypeOptions}
      />
    </>
  );
};

export default LessonsContainer;
