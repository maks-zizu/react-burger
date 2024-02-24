import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './ingredients.css';
import Modal from '../burger-main/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

function BurgerIngredients({ addIngredient, ingredients }) {
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState('bun');
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const scrollToSection = (sectionType) => {
    setCurrent(sectionType);
    const sectionRef = { bun: bunsRef, sauce: saucesRef, main: mainsRef }[
      sectionType
    ];
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIngredientClick = (ingredient) => {
    setCurrentIngredient(ingredient);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

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
        <div ref={bunsRef} className="ingredients_list pt-10">
          <p className="text text_type_main-medium">Булки</p>
          <div className="ingredients_list_items ml-4">
            {ingredients
              .filter((ingredient) => ingredient.type === 'bun')
              .map((bun) => (
                <div
                  key={bun._id}
                  className="ingredient_item mt-10"
                  onClick={() => addIngredient(bun)}
                >
                  <Counter count={1} size="default" />
                  <img
                    src={bun.image}
                    alt={bun.name}
                    onClick={() => handleIngredientClick(bun)}
                  />
                  <div className="ingredients_price m-1">
                    <p className="text text_type_digits-default">{bun.price}</p>
                    <CurrencyIcon />
                  </div>
                  <p className="text text_type_main-default">{bun.name}</p>
                </div>
              ))}
          </div>
        </div>
        <div ref={saucesRef} className="ingredients_list pt-10">
          <p className="text text_type_main-medium">Соусы</p>
          <div className="ingredients_list_items ml-4">
            {ingredients
              .filter((ingredient) => ingredient.type === 'sauce')
              .map((sauce) => (
                <div
                  key={sauce._id}
                  className="ingredient_item mt-10"
                  onClick={() => addIngredient(sauce)}
                >
                  <Counter count={1} size="default" />
                  <img
                    src={sauce.image}
                    alt={sauce.name}
                    onClick={() => handleIngredientClick(sauce)}
                  />
                  <div className="ingredients_price m-1">
                    <p className="text text_type_digits-default">
                      {sauce.price}
                    </p>
                    <CurrencyIcon />
                  </div>
                  <p className="text text_type_main-default">{sauce.name}</p>
                </div>
              ))}
          </div>
        </div>
        <div ref={mainsRef} className="ingredients_list pt-10">
          <p className="text text_type_main-medium">Начинки</p>
          <div className="ingredients_list_items ml-4">
            {ingredients
              .filter((ingredient) => ingredient.type === 'main')
              .map((main) => (
                <div
                  key={main._id}
                  className="ingredient_item mt-10"
                  onClick={() => addIngredient(main)}
                >
                  <Counter count={1} size="default" />
                  <img
                    src={main.image}
                    alt={main.name}
                    onClick={() => handleIngredientClick(main)}
                  />
                  <div className="ingredients_price m-1">
                    <p className="text text_type_digits-default">
                      {main.price}
                    </p>
                    <CurrencyIcon />
                  </div>
                  <p className="text text_type_main-default">{main.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string,
    })
  ).isRequired,
};

export default BurgerIngredients;
