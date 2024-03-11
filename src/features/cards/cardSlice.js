import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCardById, getMostViewedCards } from "../../services/apiCard_temp";

export const fetchOneCard = createAsyncThunk(
  "card/fetchOneCard",
  async function (id) {
    const cardInfo = await getCardById(id);
    return cardInfo;
  },
);

export const fetchMostViewedCards = createAsyncThunk(
  "card/fetchMostViewedCards",
  async function (num) {
    const cardInfo = await getMostViewedCards(num);
    return cardInfo;
  },
);

export const getCardFromState = (state) => {
  return state.card.card;
};

export const getMostViewedCardsFromState = (state) => {
  return state.card.mostViewedCard;
};

const initialState = {
  status: "idle",
  card: {},
  mostViewedCard: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateCard(state, action) {
      state.card = action.payload;
    },
    updateMostViewedCard(state, action) {
      state.mostViewedCard = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOneCard.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchOneCard.fulfilled, (state, action) => {
        cardSlice.caseReducers.updateCard(state, action);
        state.status = "idle";
      })
      .addCase(fetchOneCard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchMostViewedCards.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchMostViewedCards.fulfilled, (state, action) => {
        cardSlice.caseReducers.updateMostViewedCard(state, action);
        state.status = "idle";
      })
      .addCase(fetchMostViewedCards.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const { updateCard } = cardSlice.actions;
export default cardSlice.reducer;
