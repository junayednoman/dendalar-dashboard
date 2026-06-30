import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { logOut, setUser } from "../slice/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get("accessToken");
    console.log("accessToken, ", accessToken);
    // If user have a token set it in the state
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // retrieve new token
  if (result?.error?.status === 401) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    ).then((res) => res.json());

    if (res?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "auth",
    "profile",
    "meta",
    "leaderboard",
    "banner",
    "user",
    "earning",
    "plans",
    "notification",
    "content",
    "levels",
    "chapters",
    "lessons",
    "questions",
    "legal",
  ],
  endpoints: () => ({}),
});
