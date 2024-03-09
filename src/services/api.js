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

// const URL_ingredients = 'https://norma.nomoreparties.space/api/ingredients';
// const URL_order = 'https://norma.nomoreparties.space/api/orders';

// export const getIngredients = async () => {
//   try {
//     const res = await fetch(URL_ingredients);
//     if (!res.ok) {
//       throw new Error(
//         `Ответ сети был не ok. Статус ответа сервера: ${res.status}`
//       );
//     }
//     const data = await res.json();
//     return data.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const addOrder = async (ingredients) => {
//   try {
//     const res = await fetch(URL_order, {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify({
//         ingredients,
//       }),
//     });
//     if (!res.ok) {
//       throw new Error(
//         `Ответ сети был не ok. Статус ответа сервера: ${res.status}`
//       );
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
