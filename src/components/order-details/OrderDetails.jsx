import React from 'react';
import './orderDetails.css';

function OrderDetails() {
  return (
    <div className="order_details mt-8 mb-8">
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className="order_icon mb-15">
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
