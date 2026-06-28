"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";
import LessonCard, { LessonItem } from "./LessonCard";
import LessonFormModal, { LessonFormValues } from "./LessonFormModal";

const chapterOptions = ["Alphabet", "Alphabet++", "Greetings", "Basics"];
const levelOptions = ["Level A0", "Level A1", "Level A2", "Level B0"];
const lessonTypeOptions = ["Sentence", "Conversation", "Repeat"];

const initialLessons: LessonItem[] = [
  {
    id: "1",
    name: "Sentence 01",
    lessonType: "Sentence",
    chapter: "Alphabet",
    level: "Level A0",
    language: "English",
    index: "01",
    iconSrc: "",
  },
  {
    id: "2",
    name: "Conversation 02",
    lessonType: "Conversation",
    chapter: "Alphabet++",
    level: "Level A1",
    language: "Arabic",
    index: "02",
    iconSrc: "",
  },
  {
    id: "3",
    name: "Repeat 03",
    lessonType: "Repeat",
    chapter: "Greetings",
    level: "Level A0",
    language: "Spanish",
    index: "03",
    iconSrc: "",
  },
];

const LessonsContainer = () => {
  const [lessons, setLessons] = useState(initialLessons);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonItem | null>(null);

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch = lesson.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesChapter =
        selectedChapter === "all" || lesson.chapter === selectedChapter;
      const matchesLevel =
        selectedLevel === "all" || lesson.level === selectedLevel;

      return matchesSearch && matchesChapter && matchesLevel;
    });
  }, [lessons, searchTerm, selectedChapter, selectedLevel]);

  const buildLessonName = (values: LessonFormValues) =>
    `${values.lessonType} ${values.index}`;

  const handleCreateLesson = (values: LessonFormValues) => {
    setLessons((prev) => [
      {
        id: crypto.randomUUID(),
        ...values,
        name: buildLessonName(values),
        language: "English",
      },
      ...prev,
    ]);
    toast.success("Lesson created successfully");
  };

  const handleEditLesson = (values: LessonFormValues) => {
    if (!editingLesson) return;

    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === editingLesson.id
          ? {
              ...lesson,
              ...values,
              name: buildLessonName(values),
            }
          : lesson,
      ),
    );
    toast.success("Lesson updated successfully");
    setEditingLesson(null);
  };

  const handleDeleteLesson = (lesson: LessonItem) => {
    setLessons((prev) => prev.filter((item) => item.id !== lesson.id));
    toast.success(`${lesson.name} deleted successfully`);
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
            <Select value={selectedChapter} onValueChange={setSelectedChapter}>
              <SelectTrigger className="h-12! min-w-35 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Chapter" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                <SelectItem value="all">All chapters</SelectItem>
                {chapterOptions.map((chapter) => (
                  <SelectItem key={chapter} value={chapter}>
                    {chapter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="h-12! min-w-30 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                <SelectItem value="all">All levels</SelectItem>
                {levelOptions.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
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

        {filteredLessons.length ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onEdit={setEditingLesson}
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
        defaultValues={{
          lessonType: "",
          chapter: "",
          level: "",
          index: "01",
          iconSrc: "",
        }}
        title="Add New Lesson"
        description="Add new lesson within a specific level"
        submitLabel="Submit"
        lessonTypeOptions={lessonTypeOptions}
        chapterOptions={chapterOptions}
        levelOptions={levelOptions}
      />

      <LessonFormModal
        key={editingLesson?.id ?? "edit-lesson"}
        open={!!editingLesson}
        onOpenChange={(open) => {
          if (!open) setEditingLesson(null);
        }}
        onSubmit={handleEditLesson}
        defaultValues={{
          lessonType: editingLesson?.lessonType ?? "",
          chapter: editingLesson?.chapter ?? "",
          level: editingLesson?.level ?? "",
          index: editingLesson?.index ?? "01",
          iconSrc: editingLesson?.iconSrc ?? "",
        }}
        title="Update Lesson"
        description="Update lesson details within a specific level"
        submitLabel="Update"
        lessonTypeOptions={lessonTypeOptions}
        chapterOptions={chapterOptions}
        levelOptions={levelOptions}
      />
    </>
  );
};

export default LessonsContainer;
