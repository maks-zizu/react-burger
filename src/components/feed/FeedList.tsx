import React, { useEffect } from "react";
import feedListStyle from "./styles/feedList.module.css";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import FeedItem from "./FeedItem";
import { connect, wsClose } from "../../services/websocket/actions";
import { BASE_WSS_URL } from "../../services/websocket/template";

function FeedList() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(
    (state: RootState) => state.websocketAll.ordersAll
  );

  useEffect(() => {
    dispatch(connect(`${BASE_WSS_URL}/all`));

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

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
