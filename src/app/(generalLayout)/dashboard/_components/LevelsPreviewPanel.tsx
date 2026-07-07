"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import AErrorMessage from "@/components/AErrorMessage";
import { Input } from "@/components/ui/input";
import ASpinner from "@/components/ui/ASpinner";
import { useGetLevelsQuery } from "@/redux/api/levelsApi";

type LevelApiItem = {
  id: string;
  name: string;
  index: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

const PREVIEW_LIMIT = 5;

const LevelsPreviewPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, error, refetch } = useGetLevelsQuery(
    undefined,
  );
  const levels = useMemo<LevelApiItem[]>(() => data?.data || [], [data]);

  const filteredLevels = useMemo(() => {
    return levels.filter((level) =>
      `${level.name} ${level.index}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [levels, searchTerm]);

  const previewLevels = filteredLevels.slice(0, PREVIEW_LIMIT);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Level Data
        </h2>
        <p className="text-sm text-muted-foreground">
          Quick overview of the latest levels
        </p>
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Type to search"
          className="h-10 rounded-xl border-border bg-background pl-10"
        />
      </div>

      {isLoading ? (
        <ASpinner size={100} className="min-h-[260px]" />
      ) : isError ? (
        <AErrorMessage error={error} onRetry={refetch} className="min-h-[260px]" />
      ) : previewLevels.length ? (
        <div className="space-y-3">
          {previewLevels.map((level) => (
            <Link
              key={level.id}
              href="/dashboard/levels"
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-background/40"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={level.image || "/window.svg"}
                  alt={level.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-medium text-white">{level.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Level {level.index}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <div className="pt-2 text-center">
            <Link
              href="/dashboard/levels"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all levels
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[260px] items-center justify-center rounded-[20px] border border-dashed border-border bg-card/40 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">No levels found</h3>
            <p className="text-card-foreground">Try another search.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelsPreviewPanel;
