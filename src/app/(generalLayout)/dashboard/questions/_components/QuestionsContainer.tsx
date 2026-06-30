"use client";

import { useMemo, useState } from "react";
import AErrorMessage from "@/components/AErrorMessage";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import ASpinner from "@/components/ui/ASpinner";
import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import handleMutation from "@/utils/handleMutation";
import { useGetChaptersQuery } from "@/redux/api/chaptersApi";
import { useGetLessonsQuery } from "@/redux/api/lessonsApi";
import {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
} from "@/redux/api/questionsApi";
import QuestionCard, { QuestionItem } from "./QuestionCard";
import QuestionFormModal, { QuestionFormValues } from "./QuestionFormModal";

const typeOptions = [
  { label: "All Types", value: "all" },
  { label: "SENTENCE", value: "SENTENCE" },
  { label: "DIALOGUE", value: "DIALOGUE" },
];

const QuestionsContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(
    null,
  );
  const limit = 7;

  const { data, isLoading, isError, error, refetch } = useGetQuestionsQuery({
    page: currentPage,
    limit,
  });
  const { data: chaptersData } = useGetChaptersQuery(undefined);
  const { data: lessonsData } = useGetLessonsQuery(undefined);
  const [createQuestion, { isLoading: isCreating }] =
    useCreateQuestionMutation();
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const questions: QuestionItem[] = data?.data?.questions || [];
  const totalQuestions = data?.data?.meta?.total || 0;
  const chapters = chaptersData?.data || [];
  const lessons = lessonsData?.data || [];

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

  const filteredLessonFilterOptions = lessonOptions.filter(
    (lesson: { chapterId: string }) =>
      selectedChapter === "all" || lesson.chapterId === selectedChapter,
  );

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        !searchTerm ||
        question.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.sentenceInEnglish
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        question.fullSentence?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChapter =
        selectedChapter === "all" || question.chapterId === selectedChapter;
      const matchesLesson =
        selectedLesson === "all" || question.lessonId === selectedLesson;
      const matchesType =
        selectedType === "all" || question.type === selectedType;

      return matchesSearch && matchesChapter && matchesLesson && matchesType;
    });
  }, [questions, searchTerm, selectedChapter, selectedLesson, selectedType]);

  const handleCreateQuestion = async (values: QuestionFormValues) => {
    const payload =
      values.type === "SENTENCE"
        ? {
            chapterId: values.chapterId,
            lessonId: values.lessonId,
            type: values.type,
            index: values.index,
            sentenceInEnglish: values.sentenceInEnglish,
            sentenceInLearningLanguage: values.sentenceInLearningLanguage,
            hint: values.hint,
          }
        : {
            chapterId: values.chapterId,
            lessonId: values.lessonId,
            type: values.type,
            index: values.index,
            fullSentence: values.fullSentence,
            missingWord: values.missingWord,
          };

    await handleMutation(payload, createQuestion, "Creating question...", () => {
      setIsCreateOpen(false);
    });
  };

  const handleEditQuestion = async (values: QuestionFormValues) => {
    if (!editingQuestion) return;

    const payload =
      values.type === "SENTENCE"
        ? {
            chapterId: values.chapterId,
            lessonId: values.lessonId,
            type: values.type,
            index: values.index,
            sentenceInEnglish: values.sentenceInEnglish,
            sentenceInLearningLanguage: values.sentenceInLearningLanguage,
            hint: values.hint,
          }
        : {
            chapterId: values.chapterId,
            lessonId: values.lessonId,
            type: values.type,
            index: values.index,
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
            <AFilterSelect
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
              placeholder="Type"
              className="!w-[140px]"
            />
            <AFilterSelect
              value={selectedChapter}
              onChange={(value) => {
                setSelectedChapter(value);
                setSelectedLesson("all");
              }}
              options={[
                { label: "All chapters", value: "all" },
                ...chapterOptions,
              ]}
              placeholder="Chapter"
              className="!w-[160px]"
            />
            <AFilterSelect
              value={selectedLesson}
              onChange={setSelectedLesson}
              options={[
                { label: "All lessons", value: "all" },
                ...filteredLessonFilterOptions,
              ]}
              placeholder="Lesson"
              className="!w-[160px]"
            />
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="h-12 rounded-xl px-5 text-sm"
            >
              Add new question
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
        ) : filteredQuestions.length ? (
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

        <APagination
          totalItems={totalQuestions}
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <QuestionFormModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateQuestion}
        defaultValues={{
          chapterId: "",
          lessonId: "",
          type: "SENTENCE",
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
        chapterOptions={chapterOptions}
        lessonOptions={lessonOptions}
      />

      <QuestionFormModal
        open={!!editingQuestion}
        onOpenChange={(open) => {
          if (!open) setEditingQuestion(null);
        }}
        onSubmit={handleEditQuestion}
        defaultValues={
          editingQuestion
            ? {
                chapterId: editingQuestion.chapterId,
                lessonId: editingQuestion.lessonId,
                type: editingQuestion.type as "DIALOGUE" | "SENTENCE",
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
        chapterOptions={chapterOptions}
        lessonOptions={lessonOptions}
      />
    </>
  );
};

export default QuestionsContainer;
