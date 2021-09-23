import React from 'react';
import { mount } from 'enzyme';
import { App } from '../app';
import { TestComponent } from '@components';

const setup = (): JSX.Element => {
	return (
		<TestComponent>
			<App />
		</TestComponent>
	);
};

describe('<App />', () => {
	it('component should be defined and render', () => {
		const wrapper = mount(setup());
		const base = wrapper.find('FlowManager');
		expect(base).toBeDefined();
	});
});
