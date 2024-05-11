import ingredientsSlice, {
  ingredientsInit,
  initialState,
} from "./ingredientsSlice";

describe("Тестирование ingredientsSlice", () => {
  it("начальное состояние", () => {
    expect(ingredientsSlice(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("загрузка ingredients", () => {
    const action = { type: ingredientsInit.pending.type };
    const state = ingredientsSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  it("успешная загрузка ingredients", () => {
    const newIngredients = [{ id: "1", name: "Bun" }];
    const action = {
      type: ingredientsInit.fulfilled.type,
      payload: newIngredients,
    };
    const state = ingredientsSlice(initialState, action);
    expect(state.ingredientsData).toEqual(newIngredients);
    expect(state.loading).toBe(false);
  });

  it("ошибка при загрузке ingredients", () => {
    const errorAction = {
      type: ingredientsInit.rejected.type,
      error: { message: "Ошибка загрузки ингредиентов" },
    };
    const state = ingredientsSlice(initialState, errorAction);
    expect(state.err).toBe("Ошибка загрузки ингредиентов");
    expect(state.loading).toBe(false);
  });
});
