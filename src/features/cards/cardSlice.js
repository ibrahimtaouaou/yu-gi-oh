import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCardsSortedBy,
  getCardById,
  getMostViewedCards,
  getTotalCardNumber,
} from "../../services/apiCard_temp";

export const fetchOneCard = createAsyncThunk(
  "card/fetchOneCard",
  async function (id) {
    const cardInfo = await getCardById(id);
    return cardInfo;
  },
);

export const fetchTotalCardNumber = createAsyncThunk(
  "card/fetchTotalCardNumber",
  async function () {
    const totalCardNumber = await getTotalCardNumber();
    return totalCardNumber;
  },
);

export const fetchAllCards = createAsyncThunk(
  "card/fetchAllCards",
  async function (sort) {
    const cardsInfo = await getAllCardsSortedBy(sort);
    return cardsInfo;
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

export const getTotalCardsNumberFromState = (state) => {
  return state.card.totalCardNumber;
};

export const getMostViewedCardsFromState = (state) => {
  return state.card.mostViewedCard;
};

export const getAllCardsFromState = (state) => {
  return state.card.allCards;
};

const initialState = {
  status: "idle",
  totalCardNumber: 0,
  card: {},
  mostViewedCard: [],
  allCards: [],
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
    updateTotalCardNumber(state, action) {
      state.totalCardNumber = action.payload;
    },
    updateAllCards(state, action) {
      state.allCards = action.payload;
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
      })
      .addCase(fetchTotalCardNumber.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchTotalCardNumber.fulfilled, (state, action) => {
        cardSlice.caseReducers.updateTotalCardNumber(state, action);
        state.status = "idle";
      })
      .addCase(fetchTotalCardNumber.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchAllCards.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        cardSlice.caseReducers.updateAllCards(state, action);
        state.status = "idle";
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const { updateCard } = cardSlice.actions;
export default cardSlice.reducer;
