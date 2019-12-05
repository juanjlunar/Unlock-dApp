// dependencies
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

// reducers
import web3Reducer from './web3Reducer';
import ipfsReducer from './ipfsReducer';
import contractReducer from './contractReducer';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

export function configureStore() {
	const middlewares = [
		thunk,
		reduxImmutableStateInvariant(),
		createPromise({
			promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
		}),
	];
	return createStore(
		rootReducer(), 
		{},
		(composeEnhancers && composeEnhancers(applyMiddleware(...middlewares)) )|| applyMiddleware(...middlewares)
	);
};

// reducers
function rootReducer() {
	return combineReducers({
		web3Reducer,
		ipfsReducer,
		contractReducer
	});
}

