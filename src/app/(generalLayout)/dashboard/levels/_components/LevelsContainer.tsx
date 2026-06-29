"use client";

import { useMemo, useState } from "react";
import AErrorMessage from "@/components/AErrorMessage";
import ASpinner from "@/components/ui/ASpinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";
import handleMutation from "@/utils/handleMutation";
import LevelCard, { LevelItem } from "./LevelCard";
import LevelFormModal from "./LevelFormModal";
import {
  useCreateLevelMutation,
  useDeleteLevelMutation,
  useGetLevelsQuery,
  useUpdateLevelMutation,
} from "@/redux/api/levelsApi";
import { LevelFormValues } from "@/validations/levels.validation";

type LevelApiItem = {
  id: string;
  name: string;
  index: number;
  createdAt: string;
  updatedAt: string;
};

const LevelsContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<LevelApiItem | null>(null);
  const { data, isLoading, isError, error, refetch } =
    useGetLevelsQuery(undefined);
  const [createLevel, { isLoading: isCreating }] = useCreateLevelMutation();
  const [updateLevel, { isLoading: isUpdating }] = useUpdateLevelMutation();
  const [deleteLevelMutation] = useDeleteLevelMutation();
  const levels: LevelApiItem[] = data?.data || [];

  const filteredLevels = useMemo(() => {
    return levels.filter((level: LevelApiItem) => {
      return level.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [levels, searchTerm]);

  const handleCreateLevel = async (values: LevelFormValues) => {
    await handleMutation(values, createLevel, "Creating level...", () => {
      setIsCreateOpen(false);
    });
  };

  const handleEditLevel = async (values: LevelFormValues) => {
    if (!editingLevel) return;

    await handleMutation(
      { id: editingLevel.id, data: values },
      updateLevel,
      "Updating level...",
      () => {
        setEditingLevel(null);
      },
    );
  };

  const handleOpenEditLevel = (level: LevelItem) => {
    setEditingLevel(level as LevelApiItem);
  };

  const handleDeleteLevel = async (level: LevelItem) => {
    await handleMutation(level.id, deleteLevelMutation, "Deleting level...");
  };

  return (
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

      {isLoading ? (
        <ASpinner size={120} className="min-h-[320px]" />
      ) : isError ? (
        <AErrorMessage
          error={error}
          onRetry={refetch}
          className="min-h-[320px]"
        />
      ) : filteredLevels.length ? (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredLevels.map((level: LevelApiItem) => (
            <LevelCard
              key={level.id}
              level={level}
              onEdit={handleOpenEditLevel}
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
            <p className="text-card-foreground">Try another search.</p>
          </div>
        </div>
      )}

      <LevelFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateLevel}
        defaultValues={{ name: "", index: 0 }}
        title="Add New Level"
        description="Add a new level with its name and order"
        submitLabel={isCreating ? "Submitting..." : "Submit"}
      />

      <LevelFormModal
        open={!!editingLevel}
        onOpenChange={(open) => {
          if (!open) setEditingLevel(null);
        }}
        onSubmit={handleEditLevel}
        defaultValues={
          editingLevel
            ? { name: editingLevel.name, index: editingLevel.index }
            : undefined
        }
        title="Edit Level"
        description="Update the level name and order"
        submitLabel={isUpdating ? "Updating..." : "Update"}
      />
    </div>
  );
};

export default LevelsContainer;
