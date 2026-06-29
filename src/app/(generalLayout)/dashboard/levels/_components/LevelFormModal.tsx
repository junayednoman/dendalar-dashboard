"use client";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
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
  onSubmit: (values: LevelFormValues) => void | Promise<void>;
  defaultValues?: LevelFormValues;
  title: string;
  description: string;
  submitLabel: string;
}

const LevelFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  title,
  description,
  submitLabel,
}: LevelFormModalProps) => {
  const handleSubmit = async (values: LevelFormValues) => {
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
