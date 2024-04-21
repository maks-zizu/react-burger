import { IIngredient } from "./components/burger-constructor/types";

export interface IngredientsServerData {
  ingredientsData: IIngredient[] | [];
  loading: boolean;
  err: string | null;
}
