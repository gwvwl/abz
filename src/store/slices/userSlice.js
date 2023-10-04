import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../axios";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const body = new FormData();
      body.append("login", formData.login);
      body.append("password", formData.password);
      const response = await $api.post("/signin", body);
      localStorage.setItem("token", response.data.access);
      dispatch(setUser(response.data));
      return response.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  access: null,
  data: null,
  loading: false,
  error: null,
  lang: "it",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.access = action.payload.access;
      state.data = action.payload.data;
    },
    setLang(state, action) {
      state.lang = action.payload;
    },
    logout(state) {
      console.log("logout");
      state.access = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setLang, logout } = userSlice.actions;

export default userSlice.reducer;
