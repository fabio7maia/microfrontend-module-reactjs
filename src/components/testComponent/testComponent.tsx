import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore';

const store = configureStore();

export const TestComponent: React.FC = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
