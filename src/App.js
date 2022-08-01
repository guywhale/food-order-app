import React, { Fragment, useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
	const [cartVisible, setCartVisible] = useState(false);

	const cartVisibilityHandler = () => {
		setCartVisible((prevState) => {
			return !prevState;
		});
	};

	return (
		<Fragment>
			{cartVisible && <Cart onHideCart={cartVisibilityHandler} />}
			<Header onShowCart={cartVisibilityHandler} />
			<main>
				<Meals />
			</main>
		</Fragment>
	);
}

export default App;
