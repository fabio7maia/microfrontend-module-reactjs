import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { App } from '../app';

const setup = (): JSX.Element => {
	return <App />;
};

describe('<App />', () => {
	it('component should be defined and render', () => {
		const wrapper = mount(setup());
		const base = wrapper.find('FlowManager');
		expect(base).toBeDefined();
	});
});
