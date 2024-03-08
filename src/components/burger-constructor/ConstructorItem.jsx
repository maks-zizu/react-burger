import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

function ConstructorItem({ ingredient, index, handleDelete }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { type: 'ingredient', id: ingredient.uniqueId, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className="constructor_list_item">
      <div className="item_icon">
        <DragIcon />
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

ConstructorItem.propTypes = {
  ingredient: PropTypes.shape({
    uniqueId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ConstructorItem;
