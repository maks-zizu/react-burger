import ingredientDetailsSlice, {
  ingredientDetailsAdd,
  initialState,
} from "./ingredientDetailsSlice";

describe("Тестирование ingredientDetailsSlice", () => {
  it("начальное состояние", () => {
    expect(ingredientDetailsSlice(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("добавление ingredientDetails", () => {
    const ingredient = { id: "1", name: "Bun" };
    const action = { type: ingredientDetailsAdd.type, payload: ingredient };
    const state = ingredientDetailsSlice(initialState, action);
    expect(state.details).toEqual(ingredient);
  });
});
