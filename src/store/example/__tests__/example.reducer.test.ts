import React from 'react';
import { mount } from 'enzyme';
import { exampleReducer, exampleInitialState, ExampleActionTypes } from '..';

describe('<exampleReducer />', () => {
	it('should works', () => {
		const res = exampleReducer(exampleInitialState, {
			type: ExampleActionTypes.saveCustomerPersonalData,
			payload: {},
		});

		expect(res).toBeDefined();
	});
});
