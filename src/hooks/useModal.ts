import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/store";
import { ingredientDetailsAdd } from "../services/ingredientDetailsSlice";
import { IIngredient } from "../components/burger-constructor/types";

function useModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedIngredient = useAppSelector(
    (store) => store.ingredientDetails.details
  );

  const openModal = (ingredient: IIngredient) => {
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
