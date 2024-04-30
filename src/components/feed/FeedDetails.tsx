import React, { useEffect, useState } from "react";
import feedDetailsStyle from "./styles/feedDetails.module.css";
import { useLocation, useParams } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import { IIngredient } from "../burger-constructor/types";
import { Order } from "../../services/websocket/types";
import { Status, formatDate } from "./utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BASE_WSS_URL } from "../../services/websocket/template";
import { connect } from "../../services/websocket/actions";

interface IOrderIngredient extends IIngredient {
  count: number;
  totalPrice: number;
}

function FeedDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [orderIngredients, setOrderIngredients] = useState<IOrderIngredient[]>(
    []
  );
  const [order, setOrder] = useState<Order | undefined>();
  const ingredients = useAppSelector(
    (store) => store.ingredients.ingredientsData
  );

  const isModal = location.state && location.state.background;

  const { orders } = useAppSelector(
    (state: RootState) => state.websocketAll.ordersAll
  );

  const accessToken = localStorage
    .getItem("accessToken")
    ?.replace("Bearer ", "");

  useEffect(() => {
    if (location.pathname.includes("profile"))
      dispatch(connect(`${BASE_WSS_URL}?token=${accessToken}`));
    else dispatch(connect(`${BASE_WSS_URL}/all`));
  }, [accessToken, dispatch, location.pathname]);

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
    <div
      className={`${feedDetailsStyle.details_container} ${
        isModal ? "modal" : "page"
      }`}
    >
      <div className={feedDetailsStyle.details}>
        <p className="text text_type_digits-default mb-10">{`#${order.number}`}</p>
        <p className="text text_type_main-medium mb-3">{order.name}</p>
        <p
          style={{ color: "rgb(0, 204, 204)" }}
          className="text text_type_main-default mb-15"
        >
          {Status[order.status as keyof typeof Status]}
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div className={`${feedDetailsStyle.details_list} mb-10`}>
          {orderIngredients.map((ing) => (
            <div key={ing._id} className={feedDetailsStyle.details_item}>
              <div className={feedDetailsStyle.details_item_name}>
                <div className={feedDetailsStyle.details_image_container}>
                  <div
                    style={{
                      backgroundImage: `url(${ing.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "112px 64px",
                      backgroundPosition: "center",
                    }}
                    className={feedDetailsStyle.details_item_img}
                  />
                </div>
                <p className="text text_type_main-default">{ing.name}</p>
              </div>
              <div className={feedDetailsStyle.details_item_price}>
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
        <div className={feedDetailsStyle.details_price}>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(order.createdAt)}
          </p>
          <div className={feedDetailsStyle.details_total}>
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
