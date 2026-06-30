import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/admins/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/admins",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
