import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from "./ingredients.module.css";
import { Link, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import { useDrag } from "react-dnd";
import useModal from "../../hooks/useModal";
import { useAppSelector } from "../../services/store";
import { IIngredient } from "../burger-constructor/types";

function Ingredient({ ingredient }: { ingredient: IIngredient }) {
  const otherIngredients = useAppSelector(
    (store) => store.constructorIngredients.otherIngredients
  );
  const bun = useAppSelector((store) => store.constructorIngredients.bun);

  const countIngredients = useMemo(() => {
    if (ingredient.type === "bun") {
      return bun && bun._id === ingredient._id ? 2 : 0;
    }
    return (
      otherIngredients.filter((el) => el._id === ingredient._id).length || 0
    );
  }, [bun, otherIngredients, ingredient._id, ingredient.type]);

  const [{ isDrag }, drag] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // const { openModal } = useModal();

  const location = useLocation();

  return (
    <div
      ref={drag}
      key={ingredient._id}
      className={`${ingredientsStyle.ingredient_item} mt-10`}
    >
      <Counter count={countIngredients} size="default" />
      <Link
        key={ingredient._id}
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          // onClick={() => openModal(ingredient)}
        />
      </Link>
      <div className={`${ingredientsStyle.ingredients_price} m-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
}

export default memo(Ingredient);
