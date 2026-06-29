import { baseApi } from "./baseApi";

const levelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLevels: builder.query({
      query: () => ({
        url: "/levels",
        method: "GET",
      }),
      providesTags: ["levels"],
    }),
    createLevel: builder.mutation({
      query: (data) => ({
        url: "/levels",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["levels"],
    }),
    updateLevel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/levels/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["levels"],
    }),
    deleteLevel: builder.mutation({
      query: (id) => ({
        url: `/levels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["levels"],
    }),
  }),
});

export const {
  useGetLevelsQuery,
  useCreateLevelMutation,
  useUpdateLevelMutation,
  useDeleteLevelMutation,
} = levelsApi;
