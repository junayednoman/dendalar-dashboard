"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";
import LevelCard, { LevelItem } from "./LevelCard";
import LevelFormModal from "./LevelFormModal";
import { LevelFormValues } from "@/validations/levels.validation";

const initialLevels: LevelItem[] = [
  { id: "1", name: "Level A0" },
  { id: "2", name: "Level A1" },
  { id: "3", name: "Level A2" },
  { id: "4", name: "Level B0" },
  { id: "5", name: "Level B1" },
  { id: "6", name: "Level C0" },
  { id: "7", name: "Level C1" },
];

const LevelsContainer = () => {
  const [levels, setLevels] = useState(initialLevels);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<LevelItem | null>(null);

  const filteredLevels = useMemo(() => {
    return levels.filter((level) => {
      return level.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [levels, searchTerm]);

  const handleCreateLevel = ({ name }: LevelFormValues) => {
    setLevels((prev) => [
      {
        id: crypto.randomUUID(),
        name,
      },
      ...prev,
    ]);
    toast.success("Level created successfully");
  };

  const handleEditLevel = ({ name }: LevelFormValues) => {
    if (!editingLevel) return;

    setLevels((prev) =>
      prev.map((level) =>
        level.id === editingLevel.id ? { ...level, name } : level,
      ),
    );
    toast.success("Level updated successfully");
    setEditingLevel(null);
  };

  const handleDeleteLevel = (level: LevelItem) => {
    setLevels((prev) => prev.filter((item) => item.id !== level.id));
    toast.success(`${level.name} deleted successfully`);
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
              className="h-11 rounded-xl border-border bg-card pl-12 text-white"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-11 rounded-xl px-5 text-sm"
            >
              Add new level
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {filteredLevels.length ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredLevels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                onEdit={setEditingLevel}
                onDelete={handleDeleteLevel}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-dashed border-border bg-card/40 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">
                No levels found
              </h3>
              <p className="text-card-foreground">
                Try another search or create a new level.
              </p>
            </div>
          </div>
        )}
      </div>

      <LevelFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateLevel}
        defaultValues={{ name: "" }}
        title="Add New Level"
        description="Add new chapter within a specific level"
        submitLabel="Submit"
      />

      <LevelFormModal
        key={editingLevel?.id ?? "edit-level"}
        open={!!editingLevel}
        onOpenChange={(open) => {
          if (!open) setEditingLevel(null);
        }}
        onSubmit={handleEditLevel}
        defaultValues={{ name: editingLevel?.name ?? "" }}
        title="Edit Level"
        description="Update the name of this level"
        submitLabel="Update"
      />
    </>
  );
};

export default LevelsContainer;
