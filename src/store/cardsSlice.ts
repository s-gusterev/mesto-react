import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { Card } from "../types";
import { setError, setLoading, setSuccess } from "./utils";
import { AppState } from ".";

type StateCard = {
  cards: Card[];
  status: Nullable<string>;
  error: Nullable<string>;
};

type Nullable<T> = null | T;

const initialState: StateCard = {
  cards: [],
  status: null,
  error: null,
};

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

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (card: Card, { rejectWithValue, dispatch }) => {
    const { _id: id } = card;
    try {
      await api.deleteCard(id);
      dispatch(removeCard(id));
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async (card: Pick<Card, "name" | "link">, { rejectWithValue, dispatch }) => {
    const { name, link } = card;
    try {
      const card = await api.addCard(name, link);
      dispatch(addCards(card));
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCards(state, action: PayloadAction<Card>) {
      state.cards.unshift(action.payload);
    },
    setLike(state, action: PayloadAction<Card>) {
      state.cards = state.cards.map((card) =>
        card._id === action.payload._id ? action.payload : card
      );
    },
    removeCard(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialCards.pending, setLoading)
      .addCase(
        getInitialCards.fulfilled,
        (state, action: PayloadAction<Card[]>) => {
          state.status = "resolved";
          state.error = null;
          state.cards = action.payload;
        }
      )
      .addCase(getInitialCards.rejected, setError);

    builder
      .addCase(setCardLike.pending, setLoading)
      .addCase(setCardLike.fulfilled, setSuccess)
      .addCase(setCardLike.rejected, setError);

    builder
      .addCase(deleteCard.pending, setLoading)
      .addCase(deleteCard.fulfilled, setSuccess)
      .addCase(deleteCard.rejected, setError);
  },
});

export const { addCards, setLike, removeCard } = cardsSlice.actions;
export default cardsSlice.reducer;
