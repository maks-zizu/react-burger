import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/AppHeader';
import BurgerMain from './components/burger-main/BurgerMain';
import { IngredientsServerData } from './types';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const fetchIngredients = async () => {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(
        `Ответ сети был не ok. Статус ответа сервера: ${res.status}`
      );
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

function App(): ReactElement {
  const [ingredients, setIngredients] = useState<IngredientsServerData>({
    ingredientsData: [],
    loading: true,
    err: null,
  });

  useEffect(() => {
    const getIngredientsData = async () => {
      setIngredients({ ...ingredients, loading: true });
      try {
        const ingredientsData = await fetchIngredients();
        setIngredients({
          ...ingredients,
          ingredientsData: ingredientsData,
          loading: false,
        });
      } catch (error) {
        setIngredients({
          ...ingredients,
          ingredientsData: [],
          loading: false,
          err: (error as Error)?.message as string,
        });
      }
    };
    getIngredientsData();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <BurgerMain ingredients={ingredients.ingredientsData} />
    </div>
  );
}

export default App;
