import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  otherIngredients: [],
  bun: null,
};

const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    constructorBunAdd(state, action) {
      state.bun = action.payload;
    },
    constructorOtherAdd(state, action) {
      const newItem = {
        ...action.payload,
        uniqueId: Date.now() + Math.random(),
      };
      state.otherIngredients.push(newItem);
    },
    constructorOtherDel(state, action) {
      state.otherIngredients = state.otherIngredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    constructorOtherAllDel(state, action) {
      state.otherIngredients = [];
      state.bun = null;
    },
    constructorOtherMove(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const result = Array.from(state.otherIngredients);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      state.otherIngredients = result;
    },
  },
});

export const {
  constructorBunAdd,
  constructorOtherAdd,
  constructorOtherDel,
  constructorOtherMove,
  constructorOtherAllDel,
} = constructorIngredientsSlice.actions;

export default constructorIngredientsSlice.reducer;
