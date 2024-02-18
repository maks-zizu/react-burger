import React, { useState } from 'react';
import { ingredients } from '../../utils/data';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

function BurgerMain() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const addIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  return (
    <main
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        width: '1280px',
        margin: '0 auto',
        padding: '40px 20px',
        gap: '40px',
      }}
    >
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

export default BurgerMain;
