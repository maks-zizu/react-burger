import { useState } from "react";
import { useAppDispatch } from "../services/store";
import { useSelector } from "react-redux";
import {
  orderDetailsAdd,
  orderDetailsDel,
} from "../services/OrderDetailsSlice";
import { constructorOtherAllDel } from "../services/constructorIngredientsSlice";
import { useAuth } from "../services/auth/auth";
import { useNavigate } from "react-router-dom";

function useOrderModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bun, otherIngredients } = useSelector(
    (store) => store.constructorIngredients
  );
  const { orderDetailsData } = useSelector((store) => store.OrderDetails);

  const openModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
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
