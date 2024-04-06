import PropTypes from "prop-types";
import Ingredient from "./Ingredient";
import ingredientsStyle from "./ingredients.module.css";

function IngredientsList({ type, ingredients, listRef }) {
  return (
    <div ref={listRef} className={`${ingredientsStyle.ingredients_list} pt-10`}>
      <p className="text text_type_main-medium">{type}</p>
      <div className={ingredientsStyle.ingredients_list_items}>
        {ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}

IngredientsList.propTypes = {
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  listRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default IngredientsList;
