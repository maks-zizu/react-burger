import { RootState, useAppSelector } from "../../services/store";
import feedMainStyle from "./styles/feedMain.module.css";

function FeedInfo() {
  const { orders, total, totalToday } = useAppSelector(
    (state: RootState) => state.websocketAll.ordersAll
  );

  return (
    <div className={feedMainStyle.feed_info}>
      <div className={feedMainStyle.feed_info_container}>
        <div className={feedMainStyle.feed_info_orders}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={feedMainStyle.feed_info_orders_list}>
            {(orders || [])
              .slice(0, 10)
              .filter((order) => order.status === "done")
              .map((el) => (
                <p
                  key={el._id}
                  style={{ color: "rgb(0, 204, 204)" }}
                  className="text text_type_digits-default mb-2"
                >
                  {el.number}
                </p>
              ))}
          </div>
        </div>
        <div className={feedMainStyle.feed_info_orders}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={feedMainStyle.feed_info_orders_list}>
            {(orders || [])
              .slice(0, 10)
              .filter((order) => order.status === "pending")
              .map((el) => (
                <p key={el._id} className="text text_type_digits-default mb-2">
                  {el.number}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className={feedMainStyle.feed_info_total}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={feedMainStyle.feed_info_total}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
}

export default FeedInfo;
