import { baseApi } from "./baseApi";

const lessonsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: (chapterId?: string) => ({
        url: "/lessons",
        method: "GET",
        params: chapterId && chapterId !== "all" ? { chapterId } : undefined,
      }),
      providesTags: ["lessons"],
    }),
    createLesson: builder.mutation({
      query: (data) => ({
        url: "/lessons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["lessons"],
    }),
    updateLesson: builder.mutation({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lessons"],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lessons"],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonsApi;
