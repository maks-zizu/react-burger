import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function Ingredient({ ingredient, handleIngredientClick }) {
  const otherIngredients = useSelector(
    (store) => store.constructorIngredients.otherIngredients
  );
  const bun = useSelector((store) => store.constructorIngredients.bun);

  const countIngredients = useMemo(() => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : 0;
    }
    return (
      otherIngredients.filter((el) => el._id === ingredient._id).length || 0
    );
  }, [bun, otherIngredients, ingredient._id, ingredient.type]);

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} key={ingredient._id} className="ingredient_item mt-10">
      <Counter count={countIngredients} size="default" />
      <img
        src={ingredient.image}
        alt={ingredient.name}
        onClick={() => handleIngredientClick(ingredient)}
      />
      <div className="ingredients_price m-1">
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  handleIngredientClick: PropTypes.func.isRequired,
};

export default Ingredient;
