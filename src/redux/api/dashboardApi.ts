import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: (year?: string) => ({
        url: "/admins/dashboard-stats",
        method: "GET",
        params: year ? { year } : undefined,
      }),
      providesTags: ["meta"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
