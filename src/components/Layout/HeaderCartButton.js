import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
	const [animateButton, setAnimateButton] = useState(false);
	const cartContext = useContext(CartContext);
	const { items } = cartContext;
	const noOfItemsInCart = items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);
	const btnClasses = `${classes.button} ${animateButton ? classes.bump : ''}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}

		setAnimateButton(true);

		const timer = setTimeout(() => {
			setAnimateButton(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} {...props}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>{props.children}</span>
			<span className={classes.badge}>{noOfItemsInCart}</span>
		</button>
	);
};

export default HeaderCartButton;
