import React, { useEffect, useState } from "react";
import ingredientDetailsStyle from "./ingredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const ingredients = useSelector((store) => store.ingredients.ingredientsData);

  useEffect(() => {
    setIngredient(ingredients.find(({ _id }) => _id === id));
  }, [ingredients]);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={ingredientDetailsStyle.ingredient_details}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className="image"
      />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={ingredientDetailsStyle.stats}>
        <li className={ingredientDetailsStyle.statItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={ingredientDetailsStyle.statItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={ingredientDetailsStyle.statItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={ingredientDetailsStyle.statItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
