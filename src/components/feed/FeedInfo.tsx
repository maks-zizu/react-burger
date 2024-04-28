import feedMainStyle from "./styles/feedMain.module.css";

const ordersR: number[] = [345337, 345336, 345335, 345333, 345339];
const ordersP: number[] = [345330, 345334, 345338];

function FeedInfo() {
  return (
    <div className={feedMainStyle.feed_info_content}>
      <div className={feedMainStyle.feed_info_orders}>
        <div className={feedMainStyle.feed_info_order}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          {ordersR.map((el) => (
            <p className="text text_type_digits-default mb-2">{el}</p>
          ))}
        </div>
        <div className={feedMainStyle.feed_info_order}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          {ordersP.map((el) => (
            <p className="text text_type_digits-default mb-2">{el}</p>
          ))}
        </div>
      </div>
      <div className={feedMainStyle.feed_info_total}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{28752}</p>
      </div>
      <div className={feedMainStyle.feed_info_total}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{138}</p>
      </div>
    </div>
  );
}

export default FeedInfo;
