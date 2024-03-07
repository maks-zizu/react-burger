import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import './burgerMain.css';

function BurgerMain({ ingredients }) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const addIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  return (
    <main className="burgerMain">
      <BurgerIngredients
        addIngredient={addIngredient}
        ingredients={ingredients}
      />
      <BurgerConstructor
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
    </main>
  );
}

BurgerMain.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ).isRequired,
};

export default BurgerMain;
