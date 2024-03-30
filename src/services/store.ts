import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ingredientsSlice from "./ingredientsSlice";
import constructorIngredientsSlice from "./constructorIngredientsSlice";
import ingredientDetailsSlice from "./ingredientDetailsSlice";
import orderDetailsSlice from "./OrderDetailsSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    constructorIngredients: constructorIngredientsSlice,
    ingredientDetails: ingredientDetailsSlice,
    OrderDetails: orderDetailsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
