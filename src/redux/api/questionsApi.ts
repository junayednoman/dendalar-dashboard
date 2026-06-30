import { baseApi } from "./baseApi";

type GetQuestionsParams = {
  page: number;
  limit: number;
};

const questionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ page, limit }: GetQuestionsParams) => ({
        url: "/questions",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["questions"],
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/questions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["questions"],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApi;
