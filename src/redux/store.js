import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import menuReducer from './menuSlice';
import favoritesReducer from './favoritesSlice';
import orderHistoryReducer from './orderHistorySlice';
import themeReducer from './themeSlice';

const savedCart = localStorage.getItem('cartState');
const savedMenu = localStorage.getItem('menuState');
const savedFavorites = localStorage.getItem('favoritesState');
const savedOrderHistory = localStorage.getItem('orderHistoryState');
const savedTheme = localStorage.getItem('themeState');

const preloadedState = {
  ...(savedCart && { cart: JSON.parse(savedCart) }),
  ...(savedMenu && { menu: JSON.parse(savedMenu) }),
  ...(savedFavorites && { favorites: JSON.parse(savedFavorites) }),
  ...(savedOrderHistory && { orderHistory: JSON.parse(savedOrderHistory) }),
  ...(savedTheme && { theme: JSON.parse(savedTheme) }),
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    favorites: favoritesReducer,
    orderHistory: orderHistoryReducer,
    theme: themeReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartState', JSON.stringify(state.cart));
  localStorage.setItem('menuState', JSON.stringify(state.menu));
  localStorage.setItem('favoritesState', JSON.stringify(state.favorites));
  localStorage.setItem('orderHistoryState', JSON.stringify(state.orderHistory));
  localStorage.setItem('themeState', JSON.stringify(state.theme));
});
