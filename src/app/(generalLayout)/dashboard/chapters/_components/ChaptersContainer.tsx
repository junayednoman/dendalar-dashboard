"use client";

import { useMemo, useState } from "react";
import chapterImg from "@/assets/icon.svg";
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
import ChapterCard, { ChapterItem } from "./ChapterCard";
import ChapterFormModal, { ChapterFormValues } from "./ChapterFormModal";

const levelOptions = ["Level A0", "Level A1", "Level A2", "Level B0"];

const initialChapters: ChapterItem[] = [
  {
    id: "1",
    name: "Alphabet",
    level: "Level A0",
    index: "1",
    imageSrc: chapterImg.src,
  },
  {
    id: "2",
    name: "Alphabet++",
    level: "Level A1",
    index: "2",
    imageSrc: chapterImg.src,
  },
];

const ChaptersContainer = () => {
  const [chapters, setChapters] = useState(initialChapters);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<ChapterItem | null>(null);

  const filteredChapters = useMemo(() => {
    return chapters.filter((chapter) => {
      const matchesSearch = chapter.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLevel =
        selectedLevel === "all" || chapter.level === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }, [chapters, searchTerm, selectedLevel]);

  const handleCreateChapter = (values: ChapterFormValues) => {
    setChapters((prev) => [
      {
        id: crypto.randomUUID(),
        ...values,
      },
      ...prev,
    ]);
    toast.success("Chapter created successfully");
  };

  const handleEditChapter = (values: ChapterFormValues) => {
    if (!editingChapter) return;

    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === editingChapter.id ? { ...chapter, ...values } : chapter,
      ),
    );
    toast.success("Chapter updated successfully");
    setEditingChapter(null);
  };

  const handleDeleteChapter = (chapter: ChapterItem) => {
    setChapters((prev) => prev.filter((item) => item.id !== chapter.id));
    toast.success(`${chapter.name} deleted successfully`);
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
              Add new chapter
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {filteredChapters.length ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredChapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                onEdit={setEditingChapter}
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
          level: "",
          index: "1",
          imageSrc: "",
        }}
        title="Add New Chapter"
        description="Add new chapter within a specific level"
        submitLabel="Submit"
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
          level: editingChapter?.level ?? "",
          index: editingChapter?.index ?? "1",
          imageSrc: editingChapter?.imageSrc ?? "",
        }}
        title="Update Chapter"
        description="Update the chapter details within a specific level"
        submitLabel="Update"
        levelOptions={levelOptions}
      />
    </>
  );
};

export default ChaptersContainer;
