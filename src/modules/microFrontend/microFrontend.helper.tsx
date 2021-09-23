import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MicroFrontendData } from './microFrontend.types';

const w: any = window;

interface MicroFrontendHelperCreateModuleMethodInput {
	component: React.ReactNode;
	name: string;
	serviceWorker?: any;
	store?: any;
}

export const MicroFrontendHelper = {
	createModule: ({ component, name, serviceWorker, store }: MicroFrontendHelperCreateModuleMethodInput): void => {
		w[`mount${name}`] = ({ containerId, store }: MicroFrontendData) => {
			ReactDOM.render(<Provider store={store}>{component}</Provider>, document.getElementById(containerId));

			serviceWorker?.unregister();
		};

		w[`unmount${name}`] = ({ containerId }: MicroFrontendData) => {
			const container = document.getElementById(containerId);

			container && ReactDOM.unmountComponentAtNode(container);
		};

		if (!document.getElementById(`${name}-container`)) {
			ReactDOM.render(<Provider store={store}>{component}</Provider>, document.getElementById('root'));

			serviceWorker?.unregister();
		}
	},
};
