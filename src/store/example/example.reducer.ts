import { ExampleState, ExampleActionTypes } from './example.types';
import { AnyAction } from 'redux';

export const exampleInitialState: ExampleState = {
	clientInfo: {},
};

export const exampleReducer: (state: ExampleState | undefined, action: AnyAction) => ExampleState = (
	state = exampleInitialState,
	action
): ExampleState => {
	if (action.type === ExampleActionTypes.saveCustomerPersonalData) {
		const { customerPersonalData } = action.payload;

		return {
			...state,
			clientInfo: customerPersonalData || {},
		};
	}

	return state;
};
