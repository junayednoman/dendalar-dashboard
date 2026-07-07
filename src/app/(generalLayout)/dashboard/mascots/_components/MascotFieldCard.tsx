"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MascotFieldCardProps {
  field: string;
  label: string;
  imageUrl?: string | null;
  onUpload: (field: string, file: File) => Promise<void>;
  onRemove: (field: string) => Promise<void>;
  isUpdating: boolean;
  isRemoving: boolean;
}

const MascotFieldCard = ({
  field,
  label,
  imageUrl,
  onUpload,
  onRemove,
  isUpdating,
  isRemoving,
}: MascotFieldCardProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(imageUrl || "");

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(imageUrl || "");
    }
  }, [imageUrl, selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(imageUrl || "");
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    await onUpload(field, selectedFile);
    setSelectedFile(null);
  };

  const handleRemove = async () => {
    await onRemove(field);
    setSelectedFile(null);
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{label}</h3>
          <p className="mt-1 text-sm text-card-foreground">{field}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={label}
              width={800}
              height={208}
              unoptimized
              className="h-52 w-full object-cover"
            />
          ) : (
            <div className="flex h-52 items-center justify-center text-sm text-muted-foreground">
              No mascot uploaded
            </div>
          )}
        </div>

        <Input
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          onChange={handleFileChange}
          className="h-12 rounded-2xl border-border bg-transparent text-foreground"
        />

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handleSave}
            disabled={!selectedFile || isUpdating}
            className="h-11 flex-1 rounded-2xl text-sm"
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleRemove}
            disabled={(!imageUrl && !previewUrl) || isRemoving}
            className="h-11 flex-1 rounded-2xl border-border bg-transparent text-white hover:bg-white/5 hover:text-white"
          >
            {isRemoving ? "Removing..." : "Remove"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MascotFieldCard;
