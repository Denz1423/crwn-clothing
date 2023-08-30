import { createSlice } from "@reduxjs/toolkit";
// import USER_ACTION_TYPES from "./user.types";

export const USER_INITIAL_STATE = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action){
      state.currentUser = action.payload;
    },
  }
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

// Basic redux code for creating reducer (old code)
// export const userReducerOld = (state = USER_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return { ...state, currentUser: payload };
//     default:
//       return state;
//   }
// };
