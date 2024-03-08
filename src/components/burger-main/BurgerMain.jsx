import React, { useEffect } from 'react';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import './burgerMain.css';
import { ingredientsInit } from '../../services/ingredientsSlice';
import { useAppDispatch } from '../../services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function BurgerMain() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ingredientsInit());
  }, []);

  return (
    <main className="burgerMain">
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default BurgerMain;
