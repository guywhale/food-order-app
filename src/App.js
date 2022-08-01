import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
	const [cartVisible, setCartVisible] = useState(false);

	const cartVisibilityHandler = () => {
		setCartVisible((prevState) => {
			return !prevState;
		});
	};

	return (
		<CartProvider>
			{cartVisible && <Cart onHideCart={cartVisibilityHandler} />}
			<Header onShowCart={cartVisibilityHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
