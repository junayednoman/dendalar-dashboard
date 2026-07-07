import { baseApi } from "./baseApi";

const mascotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMascots: builder.query({
      query: () => ({
        url: "/mascots",
        method: "GET",
      }),
      providesTags: ["mascots"],
    }),
    updateMascots: builder.mutation({
      query: (data) => ({
        url: "/mascots",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["mascots"],
    }),
    removeMascotField: builder.mutation({
      query: (data) => ({
        url: "/mascots/remove-field",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["mascots"],
    }),
  }),
});

export const {
  useGetMascotsQuery,
  useUpdateMascotsMutation,
  useRemoveMascotFieldMutation,
} = mascotsApi;
