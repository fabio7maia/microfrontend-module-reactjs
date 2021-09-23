import { exampleInitialState } from './example';
import { StoreState } from './store';

export const initialStateMock: StoreState = {
	exampleState: {
		...exampleInitialState,
	},
};
