import React from 'react';
import {
  Counter,
  CurrencyIcon,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './ingredients.css';

function BurgerIngredients({ addIngredient, ingredients }) {
  const [current, setCurrent] = React.useState('bun');
  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === current
  );

  return (
    <section className="ingredients_section">
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className="tabs">
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className="ingredients_lists ml-4">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient._id}
            className="ingredient_item mt-10"
            onClick={() => addIngredient(ingredient)}
          >
            <Counter count={0} size="default" extraClass="m-1" />
            <img src={ingredient.image} alt={ingredient.name} />
            <div className="ingredients_price m-1">
              <p className="text text_type_digits-default">
                {ingredient.price}
              </p>
              <CurrencyIcon />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BurgerIngredients;
