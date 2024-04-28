import React from "react";
import feedListStyle from "./styles/feedList.module.css";
import { RootState, useAppSelector } from "../../services/store";
import FeedItem from "./FeedItem";

function FeedList() {
  const orders = useAppSelector((state: RootState) => state.websocket.orders);

  return (
    <section className={feedListStyle.feed_section}>
      <p className="text text_type_main-large">Лента заказов</p>
      <div className={feedListStyle.feed_list_orders}>
        {orders.map((order) => (
          <FeedItem key={order._id} order={order} />
        ))}
      </div>
    </section>
  );
}

export default FeedList;
