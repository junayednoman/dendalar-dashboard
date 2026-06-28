"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ImagePlus, Upload } from "lucide-react";
import { toast } from "sonner";

export interface LessonFormValues {
  lessonType: string;
  chapter: string;
  level: string;
  index: string;
  iconSrc: string;
}

interface LessonFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: LessonFormValues) => void;
  defaultValues?: LessonFormValues;
  title: string;
  description: string;
  submitLabel: string;
  lessonTypeOptions: string[];
  chapterOptions: string[];
  levelOptions: string[];
}

const emptyValues: LessonFormValues = {
  lessonType: "",
  chapter: "",
  level: "",
  index: "",
  iconSrc: "",
};

const LessonFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  title,
  description,
  submitLabel,
  lessonTypeOptions,
  chapterOptions,
  levelOptions,
}: LessonFormModalProps) => {
  const [values, setValues] = useState<LessonFormValues>(emptyValues);
  const [previewSrc, setPreviewSrc] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      const nextValues = defaultValues ?? emptyValues;
      setValues(nextValues);
      setPreviewSrc(nextValues.iconSrc);
    }
  }, [defaultValues, open]);

  useEffect(() => {
    return () => {
      if (previewSrc.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  const handleFieldChange = (
    key: keyof LessonFormValues,
    value: LessonFormValues[keyof LessonFormValues],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid icon image");
      return;
    }

    if (previewSrc.startsWith("blob:")) {
      URL.revokeObjectURL(previewSrc);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);
    setValues((prev) => ({ ...prev, iconSrc: objectUrl }));
  };

  const handleSubmit = () => {
    if (!values.lessonType) {
      toast.error("Lesson type is required");
      return;
    }

    if (!values.chapter) {
      toast.error("Chapter name is required");
      return;
    }

    if (!values.level) {
      toast.error("Chapter level is required");
      return;
    }

    if (!values.index) {
      toast.error("Lesson index is required");
      return;
    }

    if (!values.iconSrc) {
      toast.error("Lesson icon is required");
      return;
    }

    onSubmit(values);
    onOpenChange(false);
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

        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Lesson Type</label>
            <Select
              value={values.lessonType}
              onValueChange={(value) =>
                handleFieldChange("lessonType", value)
              }
            >
              <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                <SelectValue placeholder="Lesson Type" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {lessonTypeOptions.map((lessonType) => (
                  <SelectItem key={lessonType} value={lessonType}>
                    {lessonType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Chapter name</label>
            <Select
              value={values.chapter}
              onValueChange={(value) => handleFieldChange("chapter", value)}
            >
              <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                <SelectValue placeholder="Chapter name" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {chapterOptions.map((chapter) => (
                  <SelectItem key={chapter} value={chapter}>
                    {chapter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">
                Chapter level
              </label>
              <Select
                value={values.level}
                onValueChange={(value) => handleFieldChange("level", value)}
              >
                <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                  <SelectValue placeholder="Chapter level" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-white">
                  {levelOptions.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-white">
                Lesson Index
              </label>
              <Input
                type="number"
                value={values.index}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange("index", event.target.value)
                }
                placeholder="1"
                min="1"
                className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Lesson icon</label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleIconChange}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-background/40 px-5 text-sm text-card-foreground transition-colors hover:border-primary hover:text-white"
            >
              <Upload className="size-4" />
              {previewSrc ? "Change icon" : "Upload icon"}
            </button>

            {previewSrc ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-background/40 p-4">
                <div className="flex items-center justify-center rounded-xl bg-black/20 p-6">
                  <img
                    src={previewSrc}
                    alt="Lesson icon preview"
                    className="h-[76px] w-[76px] object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-[144px] items-center justify-center rounded-2xl border border-dashed border-border bg-background/20 text-card-foreground">
                <div className="flex flex-col items-center gap-2 text-sm">
                  <ImagePlus className="size-5" />
                  <span>No icon selected</span>
                </div>
              </div>
            )}
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            className="h-12 w-full rounded-2xl text-base"
          >
            {submitLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonFormModal;
