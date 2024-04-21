import { IIngredient } from "../burger-constructor/types";

export interface ISection {
  type: string;
  name: string;
  ingredients: IIngredient[];
}