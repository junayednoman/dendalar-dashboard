import { baseApi } from "./baseApi";

const chaptersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (levelId?: string) => ({
        url: "/chapters",
        method: "GET",
        params: levelId && levelId !== "all" ? { levelId } : undefined,
      }),
      providesTags: ["chapters"],
    }),
    createChapter: builder.mutation({
      query: (data) => ({
        url: "/chapters",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chapters"],
    }),
    updateChapter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/chapters/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["chapters"],
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/chapters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["chapters"],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chaptersApi;
