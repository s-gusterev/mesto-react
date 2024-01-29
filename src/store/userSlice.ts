import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { User } from "../types";
import { setSuccess, setLoading, setError } from "./utils";

// Получение юзера
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = await api.getProfile();

      return user;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);
//  Обновление аватара
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (avatar: string, { rejectWithValue, dispatch }) => {
    try {
      const user = await api.updateAvatar(avatar);
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    { name, about }: { name: string; about: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const user = await api.editProfile(name, about);
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// const setError = (
//   state: { status: any; error: any },
//   action: { payload: any }
// ) => {
//   state.status = "rejected";
//   state.error = action.payload;
// };

// const setLoading = (state: { status: any; error: any }) => {
//   state.status = "pending";
//   state.error = null;
// };

// const setSuccess = (state: { status: any; error: any }) => {
//   state.status = "resolved";
//   state.error = null;
// };

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: <User>{},
    status: null,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Получение юзера при загрузке страницы
    builder.addCase(getProfile.pending, (state) => {
      state.user = {
        name: "Загрузка...",
        about: "Загрузка...",
        avatar: "https://lipsum.app/120x120",
        _id: "",
      };
    });

    builder.addCase(getProfile.fulfilled, (state: any, action: any) => {
      state.user = action.payload;
      state.status = "resolved";
    });

    builder.addCase(getProfile.rejected, (state: any, action) => {
      state.error = action.payload;
      state.status = "rejected";
      state.user = {
        name: "Данные не получены",
        about: "Данные не получены",
        avatar: "https://lipsum.app/120x120",
        _id: "",
      };
    });

    // Обновление аватара
    builder.addCase(updateAvatar.pending, setLoading);
    builder.addCase(updateAvatar.fulfilled, setSuccess);
    builder.addCase(updateAvatar.rejected, setError);

    // Обновление профиля
    builder.addCase(updateUserProfile.pending, setLoading);
    builder.addCase(updateUserProfile.fulfilled, setSuccess);
    builder.addCase(updateUserProfile.rejected, setError);
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
