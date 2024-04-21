import profileStyle from "./styles/profile.module.css";

function OrderList() {
  return (
    <div className={profileStyle.profile_content}>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе можно будет посмотреть список заказов
      </p>
    </div>
  );
}

export default OrderList;
