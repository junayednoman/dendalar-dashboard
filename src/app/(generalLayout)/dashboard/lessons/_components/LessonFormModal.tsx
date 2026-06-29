"use client";

import { useEffect, useState } from "react";
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
import { toast } from "sonner";

export interface LessonFormValues {
  lessonType: string;
  chapterId: string;
  index: number;
}

interface LessonFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: LessonFormValues) => void | Promise<void>;
  defaultValues?: LessonFormValues;
  title: string;
  description: string;
  submitLabel: string;
  lessonTypeOptions: string[];
  chapterOptions: { label: string; value: string; levelLabel?: string }[];
}

const emptyValues: LessonFormValues = {
  lessonType: "",
  chapterId: "",
  index: 1,
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
}: LessonFormModalProps) => {
  const [values, setValues] = useState<LessonFormValues>(emptyValues);

  useEffect(() => {
    if (open) {
      const nextValues = defaultValues ?? emptyValues;
      setValues(nextValues);
    }
  }, [defaultValues, open]);

  const handleFieldChange = (
    key: keyof LessonFormValues,
    value: LessonFormValues[keyof LessonFormValues],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!values.lessonType) {
      toast.error("Lesson type is required");
      return;
    }

    if (!values.chapterId) {
      toast.error("Chapter name is required");
      return;
    }

    if (!values.index || values.index < 1) {
      toast.error("Valid lesson index is required");
      return;
    }

    await onSubmit(values);
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
              value={values.chapterId}
              onValueChange={(value) => handleFieldChange("chapterId", value)}
            >
              <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                <SelectValue placeholder="Chapter name" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {chapterOptions.map((chapter) => (
                  <SelectItem key={chapter.value} value={chapter.value}>
                    {chapter.levelLabel
                      ? `${chapter.label} (${chapter.levelLabel})`
                      : chapter.label}
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
                handleFieldChange("index", Number(event.target.value))
              }
              placeholder="1"
              min="1"
              className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
            />
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
