import { Action, combineReducers, Reducer } from 'redux';
import { exampleReducer, ExampleState } from './example';

export interface StoreState {
	exampleState: ExampleState;
}

interface StoreReducer {
	exampleState: any;
}

const appReducer = (): Reducer<StoreReducer> => {
	return combineReducers({
		exampleState: exampleReducer,
	});
};

export const rootReducer = (): Reducer<StoreReducer> => {
	return (state: any, action: Action): any => {
		const newState = { ...state };

		return appReducer()(newState, action);
	};
};
