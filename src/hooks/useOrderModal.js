import { useState } from 'react';
import { useAppDispatch } from '../services/store';
import { useSelector } from 'react-redux';
import {
  orderDetailsAdd,
  orderDetailsDel,
} from '../services/OrderDetailsSlice';
import { constructorOtherAllDel } from '../services/constructorIngredientsSlice';

function useOrderModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { bun, otherIngredients } = useSelector(
    (store) => store.constructorIngredients
  );
  const { orderDetailsData } = useSelector((store) => store.OrderDetails);

  const openModal = () => {
    const ingredientIds = [
      ...(bun ? [bun._id] : []),
      ...otherIngredients.map((ingredient) => ingredient._id),
    ];
    dispatch(orderDetailsAdd(ingredientIds));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    dispatch(orderDetailsDel());
    if (orderDetailsData.success) dispatch(constructorOtherAllDel());
  };

  return { isModalOpen, openModal, closeModal };
}

export default useOrderModal;
