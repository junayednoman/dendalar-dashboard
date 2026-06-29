import { baseApi } from "./baseApi";

const levelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLevels: builder.query({
      query: () => ({
        url: "/levels",
        method: "GET",
      }),
      providesTags: ["meta"],
    }),
  }),
});

export const { useGetLevelsQuery } = levelsApi;
