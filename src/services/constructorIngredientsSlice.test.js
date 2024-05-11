import constructorIngredientsSlice, {
  constructorBunAdd,
  constructorOtherAdd,
  constructorOtherDel,
  constructorOtherMove,
  constructorOtherAllDel,
  initialState,
} from "./constructorIngredientsSlice";

describe("Тестирование constructorIngredientsSlice", () => {
  it("начальное состояние", () => {
    expect(constructorIngredientsSlice(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("добавление bun", () => {
    const bun = { _id: "1", name: "Краторная булка", type: "bun" };
    const action = { type: constructorBunAdd.type, payload: bun };
    const state = constructorIngredientsSlice(initialState, action);
    expect(state.bun).toEqual(bun);
  });

  it("добавление otherIngredients", () => {
    const ingredient = { _id: "2", name: "Биокотлета", type: "main" };
    const action = { type: constructorOtherAdd.type, payload: ingredient };
    const state = constructorIngredientsSlice(initialState, action);
    expect(state.otherIngredients[0]).toHaveProperty("uniqueId");
    expect(state.otherIngredients[0].name).toEqual("Биокотлета");
  });

  it("удаление otherIngredient", () => {
    const ingredient = {
      _id: "2",
      name: "Биокотлета",
      type: "main",
      uniqueId: "unique-2",
    };
    const initialStateWithIngredient = {
      ...initialState,
      otherIngredients: [ingredient],
    };
    const action = { type: constructorOtherDel.type, payload: "unique-2" };
    const state = constructorIngredientsSlice(
      initialStateWithIngredient,
      action
    );
    expect(state.otherIngredients.length).toBe(0);
  });

  it("удаление всех ingredients", () => {
    const ingredient = {
      _id: "2",
      name: "Биокотлета",
      type: "main",
      uniqueId: "unique-2",
    };
    const bun = { _id: "1", name: "Краторная булка", type: "bun" };
    const initialStateWithItems = {
      ...initialState,
      otherIngredients: [ingredient],
      bun: bun,
    };
    const action = { type: constructorOtherAllDel.type };
    const state = constructorIngredientsSlice(initialStateWithItems, action);
    expect(state.otherIngredients.length).toBe(0);
    expect(state.bun).toBeNull();
  });

  it("перемещение ingredient", () => {
    const ingredient1 = {
      _id: "2",
      name: "Биокотлета",
      type: "main",
      uniqueId: "unique-2",
    };
    const ingredient2 = {
      _id: "3",
      name: "Соус фирменный",
      type: "sauce",
      uniqueId: "unique-3",
    };
    const initialStateWithIngredients = {
      ...initialState,
      otherIngredients: [ingredient1, ingredient2],
    };
    const action = {
      type: constructorOtherMove.type,
      payload: { fromIndex: 0, toIndex: 1 },
    };
    const state = constructorIngredientsSlice(
      initialStateWithIngredients,
      action
    );
    expect(state.otherIngredients[0].name).toBe("Соус фирменный");
    expect(state.otherIngredients[1].name).toBe("Биокотлета");
  });
});
