import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { Card } from "../types";
import { setError, setLoading, setSuccess } from "./utils";
import { AppState } from ".";

// Получение карточек
export const getInitialCards = createAsyncThunk(
  "cards/getCards",
  async (_, { rejectWithValue }) => {
    try {
      const cards = await api.getInitialCards();
      return cards;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// Добавление и удаление лайка
export const setCardLike = createAsyncThunk(
  "cards/setCardLike",
  async (card: Card, { rejectWithValue, dispatch, getState }) => {
    const currentUser = (getState() as AppState).user.user._id;
    const { _id } = card;
    const isLiked = card.likes?.some((i) => i._id === currentUser);
    try {
      const card = await api.changeLikeCardStatus(_id, isLiked!);
      dispatch(setLike(card));
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [] as Card[],
    status: null,
    error: null,
  },
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
    },
    setLike(state, action) {
      state.cards = state.cards.map((card) =>
        card._id === action.payload._id ? action.payload : card
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialCards.pending, setLoading)
      .addCase(getInitialCards.fulfilled, (state: any, action) => {
        state.status = "resolved";
        state.error = null;
        state.cards = action.payload;
      })
      .addCase(getInitialCards.rejected, setError);

    builder
      .addCase(setCardLike.pending, setLoading)
      .addCase(setCardLike.fulfilled, (state: any, action) => {
        state.status = "resolved";
        state.error = null;
      })
      .addCase(setCardLike.rejected, setError);
  },
});

export const { setCards, setLike } = cardsSlice.actions;
export default cardsSlice.reducer;
