import React from "react";
import orderDetailsStyle from "./orderDetails.module.css";
import { useAppSelector } from "../../services/store";

function OrderDetails() {
  const { orderDetailsData, err } = useAppSelector(
    (store) => store.OrderDetails
  );
  return (
    <div className={`${orderDetailsStyle.order_details} mt-8 mb-8`}>
      {orderDetailsData?.order?.number ? (
        <p data-test="order-number" className="text text_type_digits-large">
          {orderDetailsData.order.number}
        </p>
      ) : (
        <p className="text text_type_main-medium">{err}</p>
      )}
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={`${orderDetailsStyle.order_icon} mb-15`}>
        <img
          src={`${process.env.PUBLIC_URL}/graphics.svg`}
          alt="CheckMarkIcon"
        />
      </div>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
