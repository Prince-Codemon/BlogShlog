import { createSlice } from "@reduxjs/toolkit";
import decode from "jwt-decode";
function getToken() {
  const login = localStorage.getItem("bloginuser");
  if (login) {
    const { exp } = decode(login);
    if (exp < new Date().getTime() / 1000) {
      localStorage.removeItem("bloginuser");
      return null;
    }
    return JSON.parse(login);
  }
  return null;
}
function getUserId() {
  const login = localStorage.getItem("bloginuser");
  if (login) {
    const { exp, id } = decode(login);
    if (exp < new Date().getTime() / 1000) {
      localStorage.removeItem("bloginuser");
      return null;
    }
    return id;
  }
  return null;
}

const initialState = {
  user: getUserId(),
  token: getToken(),
  type: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.type = action.payload.type;
      state.user = getUserId()
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.type = "user";
      localStorage.removeItem("bloginuser");
    },
    type : (state, action) => {
      state.type = action.payload
    }
  },
});

export const { loginUser, logout, type } = userSlice.actions;
export default userSlice.reducer;
