import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: (params) => ({
        url: "/notification",
        method: "GET",
        params,
      }),
      providesTags: ["notification"],
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: "/notification",
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    deleteSingleNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: "/notification/my-notifications",
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useDeleteSingleNotificationMutation,
  useDeleteAllNotificationsMutation,
} = notificationApi;
