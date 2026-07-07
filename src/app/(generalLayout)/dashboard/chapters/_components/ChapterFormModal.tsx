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

export interface ChapterFormValues {
  name: string;
  levelId: string;
  index: number;
  note?: string;
}

interface ChapterFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ChapterFormValues) => void | Promise<void>;
  defaultValues?: ChapterFormValues;
  title: string;
  description: string;
  submitLabel: string;
  levelOptions: { label: string; value: string }[];
}

const emptyValues: ChapterFormValues = {
  name: "",
  levelId: "",
  index: 1,
  note: "",
};

const ChapterFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  title,
  description,
  submitLabel,
  levelOptions,
}: ChapterFormModalProps) => {
  const [values, setValues] = useState<ChapterFormValues>(emptyValues);

  useEffect(() => {
    if (open) {
      const nextValues = defaultValues ?? emptyValues;
      setValues(nextValues);
    }
  }, [defaultValues, open]);

  const handleFieldChange = (
    key: keyof ChapterFormValues,
    value: ChapterFormValues[keyof ChapterFormValues],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!values.name.trim()) {
      toast.error("Chapter name is required");
      return;
    }

    if (!values.levelId) {
      toast.error("Chapter level is required");
      return;
    }

    if (!values.index || values.index < 1) {
      toast.error("Valid chapter index is required");
      return;
    }

    await onSubmit({
      ...values,
      name: values.name.trim(),
      note: values.note?.trim() || undefined,
    });
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
            <label className="text-sm font-medium text-white">Chapter name</label>
            <Input
              value={values.name}
              onChange={(event) => handleFieldChange("name", event.target.value)}
              placeholder="Chapter name"
              className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">
                Chapter level
              </label>
              <Select
                value={values.levelId}
                onValueChange={(value) => handleFieldChange("levelId", value)}
              >
                <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                  <SelectValue placeholder="Chapter level" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-white">
                  {levelOptions.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-white">
                Chapter Index
              </label>
              <Input
                type="number"
                value={values.index}
                onChange={(event) =>
                  handleFieldChange("index", Number(event.target.value))
                }
                placeholder="1"
                min="1"
                className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-white">
              Chapter note
            </label>
            <textarea
              value={values.note || ""}
              onChange={(event) => handleFieldChange("note", event.target.value)}
              placeholder="Optional note"
              rows={4}
              className="min-h-28 w-full rounded-2xl border border-border bg-transparent px-5 py-3 text-white outline-none placeholder:text-muted-foreground"
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

export default ChapterFormModal;
