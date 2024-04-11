import {
  IIngredient,
  IIngredientWithUid,
} from "../components/burger-constructor/types";

export interface IIngredientsDataServer {
  ingredientsData: IIngredient[];
  loading: boolean;
  err?: string | null;
}

export interface IOrder {
  number: number;
}

export interface IOrderData {
  name: string;
  order: IOrder;
  success: boolean;
}

export interface IOrderDetailsDataServer {
  orderDetailsData: IOrderData | null;
  loading: boolean;
  err?: string | null;
}

export interface IDetailsData {
  details: IIngredient | null;
}

export interface IConstructorData {
  otherIngredients: IIngredientWithUid[];
  bun: IIngredientWithUid | null;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IUserData {
  user: IUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  err?: string | null;
}
