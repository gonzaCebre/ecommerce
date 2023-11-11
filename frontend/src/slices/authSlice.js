//En este archivo van a interactuar las credenciales y el localstorage

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null, //revisa si hay info del usuario en el localstorage, si hay lo trae (hay que parsearlo), sino establece 'null'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload; //Recibe la info
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); //Setea la info en el localStorage

      const token = action.payload.token; //Recibe la info
      localStorage.setItem("token", token); //Setea la info en el localStorage

      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('expirationTime', expirationTime);

    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
