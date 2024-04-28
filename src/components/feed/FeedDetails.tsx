import React, { useEffect, useState } from "react";
import feedDetailsStyle from "./styles/feedDetails.module.css";
import { useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../../services/store";
import { IIngredient } from "../burger-constructor/types";
import { Order } from "../../services/websocket/types";
import { formatDate } from "./utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export enum Status {
  in_progress = "Готовится",
  done = "Выполнен",
  error = "Отменён",
}

interface IOrderIngredient extends IIngredient {
  count: number;
  totalPrice: number;
}

function FeedDetails() {
  const { id } = useParams();
  const [orderIngredients, setOrderIngredients] = useState<IOrderIngredient[]>(
    []
  );
  const [order, setOrder] = useState<Order | undefined>();
  const ingredients = useAppSelector(
    (store) => store.ingredients.ingredientsData
  );

  const orders = useAppSelector((state: RootState) => state.websocket.orders);

  useEffect(() => {
    if (order && ingredients.length > 0) {
      const ingredientCounts = order.ingredients.reduce<{
        [key: string]: number;
      }>((acc, ingredientId) => {
        acc[ingredientId] = (acc[ingredientId] || 0) + 1;
        return acc;
      }, {});

      const foundIngredients: IOrderIngredient[] = Object.entries(
        ingredientCounts
      )
        .map(([id, count]) => {
          const ingredient = ingredients.find((ing) => ing._id === id);
          if (ingredient) {
            return {
              ...ingredient,
              count,
              totalPrice: count * ingredient.price,
            };
          }
          return undefined;
        })
        .filter(
          (ingredient): ingredient is IOrderIngredient =>
            ingredient !== undefined
        );

      setOrderIngredients(foundIngredients);
    }
  }, [order, ingredients]);

  useEffect(() => {
    const foundOrder = orders.find((order) => order._id === id);
    setOrder(foundOrder);
  }, [orders, id]);

  if (!order) {
    return null;
  }

  return (
    <div className={feedDetailsStyle.feed_details}>
      <div>
        <p className="text text_type_digits-default mb-10">{`#${order.number}`}</p>
        <p className="text text_type_main-medium mb-3">{order.name}</p>
        <p className="text text_type_main-default mb-15">
          {Status[order.status as keyof typeof Status]}
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div className={`${feedDetailsStyle.feed_details_list} mb-10`}>
          {orderIngredients.map((ing) => (
            <div key={ing._id} className={feedDetailsStyle.feed_item_order}>
              <div className={feedDetailsStyle.image_container}>
                <div
                  style={{
                    backgroundImage: `url(${ing.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "112px 64px",
                    backgroundPosition: "center",
                  }}
                  className={feedDetailsStyle.feed_item_img}
                />
              </div>
              <p className="text text_type_main-default">{ing.name}</p>
              <div className={feedDetailsStyle.feed_item_price}>
                <p className="text text_type_digits-default">{ing.count}</p>
                <p className="text text_type_digits-default">x</p>
                <p className="text text_type_digits-default">{ing.price}</p>
                <CurrencyIcon type="primary" />
                <p className="text text_type_digits-default">
                  {ing.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={feedDetailsStyle.feed_item_price}>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(order.createdAt)}
          </p>
          <div className={feedDetailsStyle.feed_item_total}>
            <p className="text text_type_digits-default">
              {orderIngredients.reduce((acc, item) => acc + item.totalPrice, 0)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedDetails;
