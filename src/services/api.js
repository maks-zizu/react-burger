import { request } from './utils';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = async () => {
  return request(`${BASE_URL}/ingredients`);
};

export const addOrder = async (ingredients) => {
  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });
};
