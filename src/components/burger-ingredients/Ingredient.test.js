import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { createStore } from "redux";
import { rootReducer } from "../../services/store";
import Ingredient from "./Ingredient";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Mock ingredientData
const mockIngredient = {
  _id: "1",
  image: "image-url",
  name: "Test Ingredient",
  type: "bun",
  price: 5,
};

// Создаем mock store с initialState
const store = createStore(rootReducer, {
  constructorIngredients: {
    bun: mockIngredient,
    otherIngredients: [mockIngredient, mockIngredient],
  },
});

describe("Тест компонента Ingredient", () => {
  it("рендерится без ошибок", () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <DndProvider backend={HTML5Backend}>
            <Ingredient ingredient={mockIngredient} />
          </DndProvider>
        </Router>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
