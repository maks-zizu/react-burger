import { BASE_URL } from "./template";
import { request } from "./utils";

export const getIngredients = async () => {
  return request(`${BASE_URL}/ingredients`);
};

export const addOrder = async (ingredients) => {
  return request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({ ingredients }),
  });
};
