import { IIngredient } from "../burger-constructor/types";
import { ISection } from "./types";

export const filterIngredientsByType = (
  ingredients: IIngredient[],
  type: string
): IIngredient[] => {
  return ingredients.filter((ingredient) => ingredient.type === type);
};

export const prepareSections = (
  bunIngredients: IIngredient[],
  sauceIngredients: IIngredient[],
  mainIngredients: IIngredient[]
): ISection[] => [
  { type: "bun", name: "Булки", ingredients: bunIngredients },
  { type: "sauce", name: "Соусы", ingredients: sauceIngredients },
  { type: "main", name: "Начинки", ingredients: mainIngredients },
];
