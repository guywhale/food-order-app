import React, { useContext } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
	const cartContext = useContext(CartContext);
	const noOfItemsInCart = cartContext.items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);

	return (
		<button className={classes.button} {...props}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>{props.children}</span>
			<span className={classes.badge}>{noOfItemsInCart}</span>
		</button>
	);
};

export default HeaderCartButton;
