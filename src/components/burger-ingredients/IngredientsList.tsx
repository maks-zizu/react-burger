import { IIngredient } from "../burger-constructor/types";
import Ingredient from "./Ingredient";
import ingredientsStyle from "./ingredients.module.css";

interface IngredientsListProps {
  type: string;
  ingredients: IIngredient[];
  listRef: (element: HTMLDivElement | null) => void;
}

function IngredientsList({ type, ingredients, listRef }: IngredientsListProps) {
  return (
    <div ref={listRef} className={`${ingredientsStyle.ingredients_list} pt-10`}>
      <p className="text text_type_main-medium">{type}</p>
      <div className={ingredientsStyle.ingredients_list_items}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientsList;
