import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import constructorStyle from "./constructor.module.css";
import { IIngredientWithUid } from "./types";

interface ConstructorItemProps {
  ingredient: IIngredientWithUid;
  index: number;
  handleDelete: (uniqueId: string) => void;
}

function ConstructorItem({
  ingredient,
  index,
  handleDelete,
}: ConstructorItemProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { type: "ingredient", id: ingredient.uniqueId, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className={constructorStyle.constructor_list_item}>
      <div className={constructorStyle.item_icon}>
        <DragIcon type={"primary"} />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleDelete(ingredient.uniqueId)}
      />
    </div>
  );
}

export default ConstructorItem;
