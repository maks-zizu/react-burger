import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './constructor.css';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';

function BurgerConstructor({ selectedIngredients, setSelectedIngredients }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const bun = useMemo(
    () => selectedIngredients.find((ingredient) => ingredient.type === 'bun'),
    [selectedIngredients]
  );

  const otherIngredients = useMemo(
    () => selectedIngredients.filter((ingredient) => ingredient.type !== 'bun'),
    [selectedIngredients]
  );

  const handleDelete = (id) => {
    const updatedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient._id !== id
    );
    setSelectedIngredients(updatedIngredients);
  };

  const totalCost = useMemo(
    () =>
      selectedIngredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      ),
    [selectedIngredients]
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
            <div className="constructor_list_item" key={ingredient._id}>
              <div className="item_icon">
                <DragIcon />
              </div>
              <ConstructorElement
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
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedIngredients: PropTypes.func.isRequired,
};

export default BurgerConstructor;
