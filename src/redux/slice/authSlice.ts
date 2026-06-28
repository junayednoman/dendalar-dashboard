import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store";

type TAuthType = {
  user: null | {
    id?: string;
    _id?: string;
    email: string;
    role: string;
  };
  token: null | string;
};

const initialState: TAuthType = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // set cookie for middleware access
      Cookies.set("accessToken", token, { path: "/" });
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      // Remove token for cookies
      Cookies.remove("accessToken", { path: "/" });
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
