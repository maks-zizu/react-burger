export const filterIngredientsByType = (ingredients, type) => {
  return ingredients.filter((ingredient) => ingredient.type === type);
};

export const prepareSections = (
  bunIngredients,
  sauceIngredients,
  mainIngredients
) => [
  { type: 'bun', name: 'Булки', ingredients: bunIngredients },
  { type: 'sauce', name: 'Соусы', ingredients: sauceIngredients },
  { type: 'main', name: 'Начинки', ingredients: mainIngredients },
];
