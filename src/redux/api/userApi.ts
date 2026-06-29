import { baseApi } from "./baseApi";

type GetUsersParams = {
  page: number;
  limit: number;
};

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit }: GetUsersParams) => ({
        url: "/auths",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
