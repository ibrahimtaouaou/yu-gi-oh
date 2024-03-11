import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeHearts, getUserInfo } from "../../services/apiUser";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async function (userID) {
    const { username, hearts, imgs } = await getUserInfo(userID);
    return { username, hearts, imgs };
  },
);

const initialState = {
  status: "loggedOut",
  username: "User",
  userID: null,
  hearts: [],
  imgs: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.status = "loggedIn";
      state.userID = action.payload;
    },
    logout(state, _) {
      state.status = "loggedOut";
      state.userID = null;
      state.username = "User";
      state.hearts = [];
      state.imgs = [];
    },
    changeStateUsername(state, action) {
      state.username = action.payload;
    },
    addToHearts(state, action) {
      state.hearts.push(action.payload.id);
      state.imgs.push(action.payload.imageUrl);
      changeHearts(state.userID, state.hearts, state.imgs);
    },
    removeFromHearts(state, action) {
      const index = state.hearts.indexOf(action.payload);
      state.hearts = state.hearts.filter((id) => id !== action.payload);
      state.imgs = state.imgs.filter((_, i) => i !== index);
      changeHearts(state.userID, state.hearts, state.imgs);
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      const { username, hearts, imgs } = action.payload;
      state.username = username;
      state.hearts = hearts;
      state.imgs = imgs;
    }),
});

export const getLoginStatusFromState = (state) => {
  return state.user.status;
};
export const getUserIDFromState = (state) => {
  return state.user.userID;
};
export const getUsernameFromState = (state) => {
  return state.user.username;
};
export const getHeartsFromState = (state) => {
  return state.user.hearts;
};
export const getImgsFromState = (state) => {
  return state.user.imgs;
};

export const {
  login,
  logout,
  addToHearts,
  removeFromHearts,
  changeStateUsername,
} = userSlice.actions;
export default userSlice.reducer;
