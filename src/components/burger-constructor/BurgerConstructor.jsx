import React from 'react';
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './constructor.css';

function BurgerConstructor({ selectedIngredients, setSelectedIngredients }) {
  const bun = selectedIngredients.find(
    (ingredient) => ingredient.type === 'bun'
  );
  const otherIngredients = selectedIngredients.filter(
    (ingredient) => ingredient.type !== 'bun'
  );
  const handleDelete = (id) => {
    const updatedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient._id !== id
    );
    setSelectedIngredients(updatedIngredients);
  };

  const totalCost = selectedIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (
    <section className="constructor_section pr-4 pl-4">
      <div className="constructor_content">
        {bun && (
          <div className="constructor_element">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div className="constructor_element_list">
          {otherIngredients.map((ingredient) => (
            <div className="constructor_list_item">
              <div className="item_icon">
                <DragIcon />
              </div>
              <ConstructorElement
                key={ingredient._id}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleDelete(ingredient._id)}
              />
            </div>
          ))}
        </div>
        {bun && (
          <div className="constructor_element">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className="costructor_total pr-4">
        <div className="costructor_total_cost mr-10">
          <p className="text text_type_digits-medium mr-3">
            {totalCost ? totalCost : 0}
          </p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
