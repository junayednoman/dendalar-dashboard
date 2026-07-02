"use client";

import { useEffect, useState } from "react";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  levelSchema,
  LevelFormValues,
} from "@/validations/levels.validation";

interface LevelFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: LevelFormValues, imageFile?: File | null) => void | Promise<void>;
  defaultValues?: LevelFormValues;
  imageUrl?: string;
  title: string;
  description: string;
  submitLabel: string;
}

const LevelFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  imageUrl,
  title,
  description,
  submitLabel,
}: LevelFormModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl || "");

  useEffect(() => {
    setImageFile(null);
    setPreviewUrl(imageUrl || "");
  }, [imageUrl, open]);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (values: LevelFormValues) => {
    await onSubmit(values, imageFile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewUrl(imageUrl || "");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[640px] rounded-[22px] border-border bg-card px-8 py-8 sm:px-10"
      >
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-[30px] font-bold text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-1 text-base text-card-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <AForm<LevelFormValues>
            schema={levelSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <AInput
              name="name"
              label="Level name"
              placeholder="Level name"
              required
              className="h-12 rounded-2xl"
            />

            <AInput
              name="index"
              label="Level index"
              placeholder="Level index"
              type="number"
              required
              className="h-12 rounded-2xl"
            />

            <div className="space-y-2">
              <label className="text-foreground text-sm font-medium">
                Level image
              </label>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleFileChange}
                className="h-12 rounded-2xl border-border bg-transparent text-foreground"
              />
              {previewUrl ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-background p-3">
                  <img
                    src={previewUrl}
                    alt="Level preview"
                    className="h-32 w-full rounded-xl object-cover"
                  />
                </div>
              ) : null}
            </div>

            <Button type="submit" className="h-12 w-full rounded-2xl text-base">
              {submitLabel}
            </Button>
          </AForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelFormModal;
