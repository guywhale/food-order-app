import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD_ITEM') {
		const updatedTotalAmount =
			state.totalAmount + action.item.amount * action.item.price;

		/**
		 * Check if current item being added exists in current list of
		 * items. If so, find the index of existing item in state.items
		 * array.
		 */
		const existingCartItemIndex = state.items.findIndex((item) => {
			return item.id === action.item.id;
		});

		const existingCartItem = state.items[existingCartItemIndex];

		let updatedItems;

		/**
		 * If the item being added already exists...
		 */
		if (existingCartItem) {
			/** ...create a new object containing the existing item data
			 * and add the amount of the new items to existing amount...
			 */
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};

			/** ...create a new array with all the existing items
			 * (you must always create new arrays as changes/merges
			 * to existing arrays in state will not be registered by React)...
			 *
			 */
			updatedItems = [...state.items];

			/** ...swap the existing item for the new updated item using the
			 * new updated items array and the existing item index number
			 * found earlier.
			 */
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			/**
			 * Else if new item doesn't alreay exist, simply add it to the
			 * existing list of items (you must always create new arrays via
			 * .concat() as changes/merges to existing arrays in state will
			 * not be registered by React).
			 */
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD_ITEM', item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItems: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
