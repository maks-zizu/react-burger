import React, { useCallback, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './ingredients.css';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import IngredientsList from './IngredientsList';
import useModal from '../../hooks/useModal';
import { filterIngredientsByType } from './utils';
import { useSelector } from 'react-redux';
import useTabNavigation from '../../hooks/useTabNavigation';

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredients.ingredientsData);
  const { current, scrollToSection, setRef } = useTabNavigation('bun');
  const { isModalOpen, openModal, closeModal } = useModal();

  const bunIngredients = useMemo(
    () => filterIngredientsByType(ingredients, 'bun'),
    [ingredients]
  );
  const sauceIngredients = useMemo(
    () => filterIngredientsByType(ingredients, 'sauce'),
    [ingredients]
  );
  const mainIngredients = useMemo(
    () => filterIngredientsByType(ingredients, 'main'),
    [ingredients]
  );

  const handleIngredientClick = useCallback(
    (ingredient) => {
      openModal(ingredient);
    },
    [openModal]
  );

  return (
    <section className="ingredients_section">
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className="tabs">
        <Tab
          value="bun"
          active={current === 'bun'}
          onClick={() => scrollToSection('bun')}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === 'sauce'}
          onClick={() => scrollToSection('sauce')}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === 'main'}
          onClick={() => scrollToSection('main')}
        >
          Начинки
        </Tab>
      </div>
      <div className="ingredients_lists">
        <IngredientsList
          listRef={setRef('bun')}
          type="Булки"
          ingredients={bunIngredients}
          handleIngredientClick={handleIngredientClick}
        />
        <IngredientsList
          listRef={setRef('sauce')}
          type="Соусы"
          ingredients={sauceIngredients}
          handleIngredientClick={handleIngredientClick}
        />
        <IngredientsList
          listRef={setRef('main')}
          type="Начинки"
          ingredients={mainIngredients}
          handleIngredientClick={handleIngredientClick}
        />
      </div>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
