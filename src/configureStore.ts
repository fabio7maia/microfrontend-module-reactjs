import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LoggerConfig } from './configs';
import { exampleInitialState, rootReducer, StoreState } from './store';

export default function configureStore(): Store<StoreState> {
	const composeEnhancers = composeWithDevTools({});

	const isDebugActive = LoggerConfig.debug;

	return createStore(
		rootReducer(),
		{ exampleState: exampleInitialState },
		isDebugActive ? composeEnhancers() : undefined
	);
}
