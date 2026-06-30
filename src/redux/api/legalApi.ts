import { baseApi } from "./baseApi";

const legalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLegal: builder.query({
      query: () => ({
        url: "/legal",
        method: "GET",
      }),
      providesTags: ["legal"],
    }),
    updateLegal: builder.mutation({
      query: (data) => ({
        url: "/legal",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["legal"],
    }),
  }),
});

export const { useGetLegalQuery, useUpdateLegalMutation } = legalApi;
