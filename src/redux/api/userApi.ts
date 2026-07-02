import { baseApi } from "./baseApi";

type GetUsersParams = {
  page: number;
  limit: number;
};

type ChangeAccountStatusPayload = {
  userId: string;
  status: "ACTIVE" | "BLOCKED";
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
    changeAccountStatus: builder.mutation({
      query: ({ userId, status }: ChangeAccountStatusPayload) => ({
        url: `/auths/change-account-status/${userId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery, useChangeAccountStatusMutation } = userApi;
