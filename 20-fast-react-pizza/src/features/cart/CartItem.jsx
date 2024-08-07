import { useDispatch } from 'react-redux';
import DeleteItem from './DeleteItem';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button
          type="round"
          onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        >
          -
        </Button>
        <p>{quantity}</p>
        <Button
          type="round"
          onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        >
          +
        </Button>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
