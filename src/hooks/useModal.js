import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../services/store';
import { ingredientDetailsAdd } from '../services/ingredientDetailsSlice';

function useModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedIngredient = useSelector(
    (store) => store.ingredientDetails.details
  );

  const openModal = (ingredient) => {
    dispatch(ingredientDetailsAdd(ingredient));
    setModalOpen(true);
  };

  const closeModal = () => {
    dispatch(ingredientDetailsAdd({}));
    setModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal, ingredient: selectedIngredient };
}

export default useModal;
