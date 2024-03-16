import React, { ReactElement } from 'react';
import './App.css';
import AppHeader from './components/app-header/AppHeader';
import BurgerMain from './components/burger-main/BurgerMain';

function App(): ReactElement {
  return (
    <div className="App">
      <AppHeader />
      <BurgerMain />
    </div>
  );
}

export default App;
