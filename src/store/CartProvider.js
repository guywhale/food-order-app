import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD_ITEM') {
		/**
		 * Update total amount by multiplying the amount of the new
		 * item by its price and adding it to the existing total
		 * amount
		 */
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

	if (action.type === 'REMOVE_ITEM') {
		/**
		 * Find the index of the existing item to be removed in
		 * state.items array.
		 */
		const existingCartItemIndex = state.items.findIndex((item) => {
			return item.id === action.id;
		});

		const existingCartItem = state.items[existingCartItemIndex];

		/**
		 * Update total amount by subtracting the price of the removed item
		 * from the existing total amount. The price of only one item is needed
		 * as only one item will ever be removed at a time, there is no option
		 * to remove batches of items in the app.
		 */
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;

		let updatedItems;

		/**
		 * Check if the current amount of the item to be removed is 1.
		 */
		if (existingCartItem.amount === 1) {
			/**
			 * If there is only 1 item left, remove item entirely from list.
			 * Create new array (so React can see it) that filters out item to be
			 * removed from existing list of item using the ID.
			 */
			updatedItems = state.items.filter((item) => {
				return item.id !== action.id;
			});
		} else {
			/** If the current amount of the item to be removed is > 1,
			 * first create a new item object and subtract the existing item's
			 * amount by 1 (only 1 item can be removed at a time)
			 */
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};

			/**
			 * Then create a new array with all the existing items in so that React
			 * can detect changes.
			 */
			updatedItems = [...state.items];
			/**
			 * The use the existing item index found earlier to update the existing
			 * item with the new updated item object containing the correct amount.
			 */
			updatedItems[existingCartItemIndex] = updatedItem;
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
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
