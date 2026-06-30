"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
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

export interface QuestionFormValues {
  chapterId: string;
  lessonId: string;
  type: "DIALOGUE" | "SENTENCE";
  index: number;
  sentenceInEnglish?: string;
  sentenceInLearningLanguage?: string;
  hint?: string;
  fullSentence?: string;
  missingWord?: string;
}

interface QuestionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: QuestionFormValues) => void | Promise<void>;
  defaultValues?: QuestionFormValues;
  title: string;
  description: string;
  submitLabel: string;
  chapterOptions: { label: string; value: string }[];
  lessonOptions: {
    label: string;
    value: string;
    chapterId: string;
    lessonType: string;
  }[];
}

const emptyValues: QuestionFormValues = {
  chapterId: "",
  lessonId: "",
  type: "SENTENCE",
  index: 1,
  sentenceInEnglish: "",
  sentenceInLearningLanguage: "",
  hint: "",
  fullSentence: "",
  missingWord: "",
};

const QuestionFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  title,
  description,
  submitLabel,
  chapterOptions,
  lessonOptions,
}: QuestionFormModalProps) => {
  const [values, setValues] = useState<QuestionFormValues>(emptyValues);

  useEffect(() => {
    if (open) {
      setValues(defaultValues ?? emptyValues);
    }
  }, [defaultValues, open]);

  const filteredLessonOptions = useMemo(() => {
    return lessonOptions.filter(
      (lesson) =>
        (!values.chapterId || lesson.chapterId === values.chapterId) &&
        lesson.lessonType === values.type,
    );
  }, [lessonOptions, values.chapterId, values.type]);

  const handleFieldChange = (
    key: keyof QuestionFormValues,
    value: QuestionFormValues[keyof QuestionFormValues],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (value: "DIALOGUE" | "SENTENCE") => {
    setValues((prev) => ({
      ...prev,
      type: value,
      lessonId: "",
    }));
  };

  const handleChapterChange = (value: string) => {
    setValues((prev) => ({
      ...prev,
      chapterId: value,
      lessonId: "",
    }));
  };

  const handleSubmit = async () => {
    if (!values.chapterId) {
      toast.error("Chapter is required");
      return;
    }

    if (!values.lessonId) {
      toast.error("Lesson is required");
      return;
    }

    if (!values.index || values.index < 1) {
      toast.error("Valid index is required");
      return;
    }

    if (values.type === "SENTENCE") {
      if (!values.sentenceInEnglish?.trim()) {
        toast.error("English sentence is required");
        return;
      }
      if (!values.sentenceInLearningLanguage?.trim()) {
        toast.error("Learning language sentence is required");
        return;
      }
      if (!values.hint?.trim()) {
        toast.error("Hint is required");
        return;
      }
    }

    if (values.type === "DIALOGUE") {
      if (!values.fullSentence?.trim()) {
        toast.error("Full sentence is required");
        return;
      }
      if (!values.missingWord?.trim()) {
        toast.error("Missing word is required");
        return;
      }
    }

    await onSubmit({
      ...values,
      sentenceInEnglish: values.sentenceInEnglish?.trim() || undefined,
      sentenceInLearningLanguage:
        values.sentenceInLearningLanguage?.trim() || undefined,
      hint: values.hint?.trim() || undefined,
      fullSentence: values.fullSentence?.trim() || undefined,
      missingWord: values.missingWord?.trim() || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[720px] rounded-[22px] border-border bg-card px-8 py-8 sm:px-10"
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
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Type</label>
              <Select value={values.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                  <SelectValue placeholder="Question type" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-white">
                  <SelectItem value="SENTENCE">SENTENCE</SelectItem>
                  <SelectItem value="DIALOGUE">DIALOGUE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Index</label>
              <Input
                type="number"
                min="1"
                value={values.index}
                onChange={(event) =>
                  handleFieldChange("index", Number(event.target.value))
                }
                className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Chapter</label>
              <Select value={values.chapterId} onValueChange={handleChapterChange}>
                <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-white">
                  {chapterOptions.map((chapter) => (
                    <SelectItem key={chapter.value} value={chapter.value}>
                      {chapter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Lesson</label>
              <Select
                value={values.lessonId}
                onValueChange={(value) => handleFieldChange("lessonId", value)}
              >
                <SelectTrigger className="h-12! w-full rounded-2xl border-border bg-transparent px-5 text-white">
                  <SelectValue placeholder="Select lesson" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-white">
                  {filteredLessonOptions.map((lesson) => (
                    <SelectItem key={lesson.value} value={lesson.value}>
                      {lesson.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {values.type === "SENTENCE" ? (
            <>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  Sentence in English
                </label>
                <Input
                  value={values.sentenceInEnglish || ""}
                  onChange={(event) =>
                    handleFieldChange("sentenceInEnglish", event.target.value)
                  }
                  className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  Sentence in Learning Language
                </label>
                <Input
                  value={values.sentenceInLearningLanguage || ""}
                  onChange={(event) =>
                    handleFieldChange(
                      "sentenceInLearningLanguage",
                      event.target.value,
                    )
                  }
                  className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Hint</label>
                <Input
                  value={values.hint || ""}
                  onChange={(event) =>
                    handleFieldChange("hint", event.target.value)
                  }
                  className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  Full Sentence
                </label>
                <Input
                  value={values.fullSentence || ""}
                  onChange={(event) =>
                    handleFieldChange("fullSentence", event.target.value)
                  }
                  className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  Missing Word
                </label>
                <Input
                  value={values.missingWord || ""}
                  onChange={(event) =>
                    handleFieldChange("missingWord", event.target.value)
                  }
                  className="h-12 rounded-2xl border-border bg-transparent px-5 text-white"
                />
              </div>
            </>
          )}

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

export default QuestionFormModal;
