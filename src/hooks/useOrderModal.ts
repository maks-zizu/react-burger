import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/store";
import {
  orderDetailsAdd,
  orderDetailsDel,
} from "../services/OrderDetailsSlice";
import { constructorOtherAllDel } from "../services/constructorIngredientsSlice";
import { useAuth } from "../services/auth/auth";
import { useNavigate } from "react-router-dom";
import { IIngredientWithUid } from "../components/burger-constructor/types";
import { IAuthContextType } from "../services/auth/types";
import { IOrderDetailsDataServer } from "../services/types";

interface IConstructorState {
  bun: IIngredientWithUid | null;
  otherIngredients: IIngredientWithUid[];
}

function useOrderModal() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useAuth() as IAuthContextType;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bun, otherIngredients } = useAppSelector<IConstructorState>(
    (store) => store.constructorIngredients
  );
  const { orderDetailsData } = useAppSelector<IOrderDetailsDataServer>(
    (store) => store.OrderDetails
  );

  const openModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const ingredientIds: string[] = [
      ...(bun ? [bun._id] : []),
      ...otherIngredients.map((ingredient) => ingredient._id),
    ];
    dispatch(orderDetailsAdd(ingredientIds));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    dispatch(orderDetailsDel());
    if (orderDetailsData && orderDetailsData.success)
      dispatch(constructorOtherAllDel());
  };

  return { isModalOpen, openModal, closeModal };
}

export default useOrderModal;
