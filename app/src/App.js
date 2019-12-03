import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import RootContainer from './containers/RootContainer';



// store
const store = configureStore();

const App = () => {
	return (
		<Provider store={store}>
			<RootContainer />
		</Provider>
	);
}

export default App;

