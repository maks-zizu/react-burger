import { BASE_URL } from "./template";
import { request } from "./utils";

export const getIngredients = async () => {
  return request(`${BASE_URL}/ingredients`);
};

export const addOrder = async (ingredients: string[]) => {
  return request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") ?? undefined,
    } as HeadersInit,
    body: JSON.stringify({ ingredients }),
  });
};
