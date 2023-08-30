// import { CART_ACTION_TYPE } from "./cart.types";
import { createSlice } from "@reduxjs/toolkit";

const addCartItem = (cartItems, productToAdd) => {
  //Find if cartitems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  //If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  //Return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //Find cart item to remove
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id;
  });

  //Check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => {
      return cartItem.id !== cartItemToRemove.id;
    });
  }

  //Return back cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => {
    return cartItem.id !== cartItemToClear.id;
  });
};

export const CART_INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart(state, action){
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action){
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action){
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen(state, action){
      state.isCartOpen = action.payload;
    },
    resetCart(state, action){
      state.cartItems = CART_INITIAL_STATE.cartItems;
    }
  }
});

export const {addItemToCart, removeItemFromCart, clearItemFromCart, setIsCartOpen, resetCart} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// Basic redux code for creating reducer (old code)
// export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPE.SET_CART_ITEMS:
//       return {
//         ...state,
//         cartItems: payload,
//       };
//     case CART_ACTION_TYPE.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       };
//     case CART_ACTION_TYPE.SET_CART_DEFAULT:
//       return CART_INITIAL_STATE;
//     default:
//       return state;
//   }
// };
