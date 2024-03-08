export const filterIngredientsByType = (ingredients, type) => {
  return ingredients.filter((ingredient) => ingredient.type === type);
};
