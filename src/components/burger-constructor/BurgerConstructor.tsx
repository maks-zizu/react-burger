import React, { useMemo } from "react";
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "./constructor.module.css";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  constructorBunAdd,
  constructorOtherAdd,
  constructorOtherDel,
  constructorOtherMove,
} from "../../services/constructorIngredientsSlice";
import { DropTargetMonitor, useDrop } from "react-dnd";
import ConstructorItem from "./ConstructorItem";
import useOrderModal from "../../hooks/useOrderModal";
import { IIngredientWithUid } from "./types";

interface ConstructorProps {
  bun: IIngredientWithUid | null;
  otherIngredients: IIngredientWithUid[];
}

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const { bun, otherIngredients } = useAppSelector<ConstructorProps>(
    (store) => store.constructorIngredients
  );

  const { isModalOpen, openModal, closeModal } = useOrderModal();

  const handleDelete = (uniqueId: string) => {
    dispatch(constructorOtherDel(uniqueId));
  };

  const totalCost = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      otherIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
    );
  }, [otherIngredients, bun]);

  const [, dropTarget] = useDrop<
    IIngredientWithUid,
    void,
    { isHover: boolean }
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (ingredient, monitor: DropTargetMonitor<IIngredientWithUid>) => {
      if (ingredient.type === "bun") dispatch(constructorBunAdd(ingredient));
      else dispatch(constructorOtherAdd(ingredient));
    },
  });

  const [, dropRef] = useDrop({
    accept: "item",
    drop: (item: { index: number; id: string }, monitor) => {
      const clientOffset = monitor.getClientOffset()!;
      const clientY = clientOffset.y;
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
    <section
      data-test="constructor"
      className={`${constructorStyle.constructor_section} pr-4 pl-4`}
    >
      <div
        data-test="drop-area"
        className={constructorStyle.constructor_content}
        ref={dropTarget}
      >
        {bun && (
          <div className={constructorStyle.constructor_element}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div
          className={constructorStyle.constructor_element_list}
          ref={dropRef}
        >
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
          <div className={constructorStyle.constructor_element}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={`${constructorStyle.costructor_total} pr-4`}>
        <div className={`${constructorStyle.costructor_total_cost} mr-10`}>
          <p className="text text_type_digits-medium mr-3">
            {totalCost ? totalCost : 0}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          data-test="order-button"
          disabled={!otherIngredients.length && !bun}
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
        {isModalOpen && (
          <Modal data-test="modal" onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default BurgerConstructor;
