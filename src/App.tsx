import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/AppHeader';
import BurgerMain from './components/burger-main/BurgerMain';
import { IngredientsServerData } from './types';

export const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App(): ReactElement {
  const [state, setState] = useState<IngredientsServerData>({
    IngredientsData: [],
    loading: true,
    err: null,
  });

  useEffect(() => {
    const getIngredientsData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setState({ ...state, IngredientsData: data.data, loading: false });
      } catch (error) {
        setState({
          IngredientsData: [],
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
      <BurgerMain ingredients={state.IngredientsData} />
    </div>
  );
}

export default App;
