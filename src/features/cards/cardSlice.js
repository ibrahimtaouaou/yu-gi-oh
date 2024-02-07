import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCard } from "../../services/apiCard";

export const fetchCard = createAsyncThunk(
  "card/fetchCard",
  async function (id) {
    const cardInfo = await getCard(id);
    return cardInfo;
  },
);

export const getCardFromState = (state) => {
  return state.card.card;
};

// export const setCard = (state) => return

const initialState = {
  card: {},
  status: "idle",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateCard(state, action) {
      state.card = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCard.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        cardSlice.caseReducers.updateCard(state, action);
        state.card = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCard.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const { updateCard } = cardSlice.actions;
export default cardSlice.reducer;
