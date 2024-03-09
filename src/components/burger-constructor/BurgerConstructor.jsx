import React, { useMemo } from 'react';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './constructor.css';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import {
  constructorBunAdd,
  constructorOtherAdd,
  constructorOtherDel,
  constructorOtherMove,
} from '../../services/constructorIngredientsSlice';
import { useDrop } from 'react-dnd';
import ConstructorItem from './ConstructorItem';
import useOrderModal from '../../hooks/useOrderModal';

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const { bun, otherIngredients } = useSelector(
    (store) => store.constructorIngredients
  );

  const { isModalOpen, openModal, closeModal } = useOrderModal();

  const handleDelete = (uniqueId) => {
    dispatch(constructorOtherDel(uniqueId));
  };

  const totalCost = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      otherIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
    );
  }, [otherIngredients, bun]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      if (ingredient.type === 'bun') dispatch(constructorBunAdd(ingredient));
      else dispatch(constructorOtherAdd(ingredient));
    },
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const clientY = clientOffset ? clientOffset.y : 0;
      const hoverTop = bun ? 240 : 140;
      const hoverClientY = clientY - hoverTop;
      const itemHeight = 96;
      const hoverIndex = Math.floor(hoverClientY / itemHeight);
      if (item.index !== hoverIndex) {
        dispatch(
          constructorOtherMove({ fromIndex: item.index, toIndex: hoverIndex })
        );
      }
    },
  });

  return (
    <section className="constructor_section pr-4 pl-4">
      <div className="constructor_content" ref={dropTarget}>
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
        <div className="constructor_element_list" ref={dropRef}>
          {otherIngredients &&
            otherIngredients.map((ingredient, index) => (
              <ConstructorItem
                ingredient={ingredient}
                key={ingredient.uniqueId}
                handleDelete={handleDelete}
                index={index}
              />
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
          disabled={!otherIngredients.length && !bun}
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

export default BurgerConstructor;
