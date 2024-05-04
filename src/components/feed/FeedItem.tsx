import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedListStyle from "./styles/feedList.module.css";
import { Link, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import { useAppSelector } from "../../services/store";
import { Order } from "../../services/websocket/types";
import { formatDate } from "./utils";

function FeedItem({ order }: { order: Order }) {
  const ingredientsData = useAppSelector(
    (store) => store.ingredients.ingredientsData
  );

  const { total, imageUrls } = useMemo(() => {
    const orderIngredientIds = order.ingredients;
    let totalSum = 0;
    let images: string[] = [];
    ingredientsData.forEach((ingredient) => {
      if (orderIngredientIds.includes(ingredient._id)) {
        totalSum += ingredient.price;
        images.push(ingredient.image);
      }
    });
    return { total: totalSum, imageUrls: images };
  }, [ingredientsData, order.ingredients]);

  const extraCount = imageUrls.length > 6 ? imageUrls.length - 6 : 0;
  const visibleImages = imageUrls.slice(0, 6);

  const location = useLocation();

  return (
    <Link
      key={order._id}
      to={`/feed/${order._id}`}
      state={{ background: location }}
      className={`${feedListStyle.feed_item} p-6`}
    >
      <div className={feedListStyle.feed_item_order}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </p>
      </div>
      <p
        className={`${feedListStyle.feed_item_name} text text_type_main-medium`}
      >
        {order.name}
      </p>
      <div className={feedListStyle.feed_item_price}>
        <div className={feedListStyle.feed_item_container_img}>
          {visibleImages.map((url, index) => (
            <div
              key={index}
              style={{ zIndex: `${index + 1}` }}
              className={feedListStyle.image_container}
            >
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "112px 64px",
                  backgroundPosition: "center",
                }}
                className={feedListStyle.feed_item_img}
              />
              <div className={feedListStyle.overlay_icon}></div>
            </div>
          ))}
          {extraCount > 0 && (
            <div className={feedListStyle.extra_images}>+{extraCount}</div>
          )}
        </div>
        <div className={feedListStyle.feed_item_total}>
          <p className="text text_type_digits-default">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

export default memo(FeedItem);
