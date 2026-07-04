"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useState } from "react";
import AErrorMessage from "@/components/AErrorMessage";
import ASpinner from "@/components/ui/ASpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import handleMutation from "@/utils/handleMutation";
import { useGetChaptersQuery } from "@/redux/api/chaptersApi";
import { useGetLessonsQuery } from "@/redux/api/lessonsApi";
import { useGetLevelsQuery } from "@/redux/api/levelsApi";
import {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
} from "@/redux/api/questionsApi";
import QuestionCard, { QuestionItem } from "./QuestionCard";
import QuestionFormModal, { QuestionFormValues } from "./QuestionFormModal";

const QuestionsContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(
    null,
  );

  const { data, isLoading, isError, error, refetch } = useGetQuestionsQuery(
    undefined,
  );
  const { data: levelsData } = useGetLevelsQuery(undefined);
  const levels = levelsData?.data || [];

  useEffect(() => {
    if (!selectedLevel && levels.length) {
      setSelectedLevel(levels[0].id);
    }
  }, [levels, selectedLevel]);

  const { data: chaptersData, isFetching: isChaptersFetching } =
    useGetChaptersQuery(selectedLevel);
  const { data: allChaptersData } = useGetChaptersQuery(undefined);
  const chapters = chaptersData?.data || [];
  const allChapters = allChaptersData?.data || [];

  useEffect(() => {
    if (!selectedLevel) return;

    if (!chapters.length) {
      setSelectedChapter("");
      setSelectedLesson("");
      return;
    }

    const hasSelectedChapter = chapters.some(
      (chapter: any) => chapter.id === selectedChapter,
    );

    if (!hasSelectedChapter) {
      setSelectedChapter(chapters[0].id);
      setSelectedLesson("");
    }
  }, [chapters, selectedChapter, selectedLevel]);

  const { data: lessonsData, isFetching: isLessonsFetching } = useGetLessonsQuery(
    selectedChapter ? selectedChapter : skipToken,
  );
  const lessons = selectedChapter ? lessonsData?.data || [] : [];

  useEffect(() => {
    if (!selectedChapter) {
      setSelectedLesson("");
      return;
    }

    if (!lessons.length) {
      setSelectedLesson("");
      return;
    }

    const hasSelectedLesson = lessons.some(
      (lesson: any) => lesson.id === selectedLesson,
    );

    if (!hasSelectedLesson) {
      setSelectedLesson(lessons[0].id);
    }
  }, [lessons, selectedChapter, selectedLesson]);

  const [createQuestion, { isLoading: isCreating }] =
    useCreateQuestionMutation();
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const questions: QuestionItem[] =
    data?.data?.questions || data?.data || [];

  const levelOptions = levels.map((level: any) => ({
    label: level.name,
    value: level.id,
  }));

  const chapterOptions = chapters.map((chapter: any) => ({
    label: chapter.name,
    value: chapter.id,
  }));

  const lessonOptions = lessons.map((lesson: any) => ({
    label: `${lesson.lessonType} ${lesson.index}`,
    value: lesson.id,
    chapterId: lesson.chapterId,
    lessonType: lesson.lessonType,
  }));

  const hasNoChaptersForSelectedLevel =
    !!selectedLevel && !isChaptersFetching && chapters.length === 0;
  const hasNoLessonsForSelectedChapter =
    !!selectedChapter && !isLessonsFetching && lessons.length === 0;

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        !searchTerm ||
        question.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.sentenceInEnglish
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        question.fullSentence?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChapter = !!selectedChapter && question.chapterId === selectedChapter;
      const matchesLesson = !!selectedLesson && question.lessonId === selectedLesson;

      return matchesSearch && matchesChapter && matchesLesson;
    });
  }, [questions, searchTerm, selectedChapter, selectedLesson]);

  const handleCreateQuestion = async (values: QuestionFormValues) => {
    const payload = {
      chapterId: values.chapterId,
      lessonId: values.lessonId,
      index: values.index,
      sentenceInEnglish: values.sentenceInEnglish,
      sentenceInLearningLanguage: values.sentenceInLearningLanguage,
      hint: values.hint,
      fullSentence: values.fullSentence,
      missingWord: values.missingWord,
    };

    await handleMutation(payload, createQuestion, "Creating question...", () => {
      setIsCreateOpen(false);
    });
  };

  const handleEditQuestion = async (values: QuestionFormValues) => {
    if (!editingQuestion) return;

    const payload = {
      chapterId: values.chapterId,
      lessonId: values.lessonId,
      index: values.index,
      sentenceInEnglish: values.sentenceInEnglish,
      sentenceInLearningLanguage: values.sentenceInLearningLanguage,
      hint: values.hint,
      fullSentence: values.fullSentence,
      missingWord: values.missingWord,
    };

    await handleMutation(
      { id: editingQuestion.id, data: payload },
      updateQuestion,
      "Updating question...",
      () => {
        setEditingQuestion(null);
      },
    );
  };

  const handleDeleteQuestion = async (question: QuestionItem) => {
    await handleMutation(question.id, deleteQuestion, "Deleting question...");
  };

  return (
    <>
      <div className="space-y-10 pt-8">
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Type to search"
              className="h-12 rounded-xl border-border bg-card pl-12 text-white"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap xl:flex-nowrap">
            <Select
              value={selectedLevel}
              onValueChange={(value) => {
                setSelectedChapter("");
                setSelectedLesson("");
                setSelectedLevel(value);
              }}
            >
              <SelectTrigger className="h-12! min-w-30 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {levelOptions.map((level: { label: string; value: string }) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedChapter}
              onValueChange={(value) => {
                setSelectedLesson("");
                setSelectedChapter(value);
              }}
            >
              <SelectTrigger className="h-12! min-w-35 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Chapter" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {chapterOptions.length ? (
                  chapterOptions.map((chapter: { label: string; value: string }) => (
                    <SelectItem key={chapter.value} value={chapter.value}>
                      {chapter.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-card-foreground">
                    No chapters found
                  </div>
                )}
              </SelectContent>
            </Select>

            <Select
              value={selectedLesson}
              onValueChange={setSelectedLesson}
            >
              <SelectTrigger className="h-12! min-w-35 rounded-xl border-border bg-transparent px-4 text-white">
                <SelectValue placeholder="Lesson" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-white">
                {lessonOptions.length ? (
                  lessonOptions.map((lesson: { label: string; value: string }) => (
                    <SelectItem key={lesson.value} value={lesson.value}>
                      {lesson.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-card-foreground">
                    No lessons found
                  </div>
                )}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-12 rounded-xl px-5 text-sm"
            >
              Add new question
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        {isLoading || isChaptersFetching || isLessonsFetching ? (
          <ASpinner size={120} className="min-h-[320px]" />
        ) : isError ? (
          <AErrorMessage
            error={error}
            onRetry={refetch}
            className="min-h-[320px]"
          />
        ) : !hasNoChaptersForSelectedLevel &&
          !hasNoLessonsForSelectedChapter &&
          filteredQuestions.length ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onEdit={setEditingQuestion}
                onDelete={handleDeleteQuestion}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-dashed border-border bg-card/40 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">
                No questions found
              </h3>
              <p className="text-card-foreground">
                Try another filter or create a new question.
              </p>
            </div>
          </div>
        )}
      </div>

      <QuestionFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateQuestion}
        defaultValues={{
          levelId: selectedLevel,
          chapterId: "",
          lessonId: "",
          index: 1,
          sentenceInEnglish: "",
          sentenceInLearningLanguage: "",
          hint: "",
          fullSentence: "",
          missingWord: "",
        }}
        title="Add New Question"
        description="Create a sentence or dialogue question"
        submitLabel={isCreating ? "Submitting..." : "Submit"}
        levelOptions={levelOptions}
      />

      <QuestionFormModal
        key={editingQuestion?.id ?? "edit-question"}
        open={!!editingQuestion}
        onOpenChange={(open) => {
          if (!open) setEditingQuestion(null);
        }}
        onSubmit={handleEditQuestion}
        defaultValues={
          editingQuestion
            ? {
                levelId:
                  allChapters.find(
                    (chapter: any) => chapter.id === editingQuestion.chapterId,
                  )?.levelId ?? selectedLevel,
                chapterId: editingQuestion.chapterId,
                lessonId: editingQuestion.lessonId,
                index: editingQuestion.index,
                sentenceInEnglish: editingQuestion.sentenceInEnglish || "",
                sentenceInLearningLanguage:
                  editingQuestion.sentenceInLearningLanguage || "",
                hint: editingQuestion.hint || "",
                fullSentence: editingQuestion.fullSentence || "",
                missingWord: editingQuestion.missingWord || "",
              }
            : undefined
        }
        title="Update Question"
        description="Update question details"
        submitLabel={isUpdating ? "Updating..." : "Update"}
        levelOptions={levelOptions}
      />
    </>
  );
};

export default QuestionsContainer;
