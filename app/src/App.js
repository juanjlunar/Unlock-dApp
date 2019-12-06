import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import RootContainer from './containers/RootContainer';
import BigNumber from 'bignumber.js';

window.__globals = Object.freeze({
	ipfsUrl: 'https://ipfs.io/ipfs/'
});

// store
const store = configureStore();

const App = () => {
	BigNumber.set({EXPONENTIAL_AT: [-20,20]});
	return (
		<Provider store={store}>
			<RootContainer />
		</Provider>
	);
}

export default App;

