import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ingredientsSlice from "./ingredientsSlice";
import constructorIngredientsSlice from "./constructorIngredientsSlice";
import ingredientDetailsSlice from "./ingredientDetailsSlice";
import orderDetailsSlice from "./OrderDetailsSlice";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { websocketAllReducer } from "./websocket/slices/websocketAllSlice";
import { wsActions } from "./template";

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  constructorIngredients: constructorIngredientsSlice,
  ingredientDetails: ingredientDetailsSlice,
  OrderDetails: orderDetailsSlice,
  websocketAll: websocketAllReducer,
});

const webSocketMiddleware = socketMiddleware(wsActions);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(webSocketMiddleware);
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

export default store;
