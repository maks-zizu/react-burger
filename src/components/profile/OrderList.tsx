import { useEffect } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import orderListStyle from "./styles/orderList.module.css";
import OrderItem from "./OrderItem";
import { connect, wsClose } from "../../services/websocket/actions";
import { BASE_WSS_URL } from "../../services/websocket/template";

function OrderList() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(
    (state: RootState) => state.websocketAll.ordersAll
  );
  const accessToken = localStorage
    .getItem("accessToken")
    ?.replace("Bearer ", "");

  useEffect(() => {
    dispatch(connect(`${BASE_WSS_URL}?token=${accessToken}`));

    return () => {
      dispatch(wsClose());
    };
  }, [accessToken, dispatch]);

  const reversedOrders = [...orders].reverse();

  return (
    <div className={orderListStyle.order_list_content}>
      <div className={orderListStyle.order_list}>
        {(reversedOrders || []).map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderList;
