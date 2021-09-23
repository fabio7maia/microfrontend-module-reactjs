import React from 'react';
import { MicroFrontendData } from './microFrontend.types';

const w: any = window;

export interface MicroFrontendProps extends MicroFrontendData {
	name: string;
	host: string;
}

export const MicroFrontend: React.FC<MicroFrontendProps> = (props) => {
	const { containerId, host, name } = props;

	React.useEffect(() => {
		const scriptId = `micro-frontend-script-${name}`;

		const data: MicroFrontendData = { ...props };

		const mountMicroFrontend = () => {
			w[`mount${name}`](data);
		};

		if (document.getElementById(scriptId)) {
			mountMicroFrontend();
			return;
		}

		fetch(`${host}/asset-manifest.json`)
			.then((res) => res.json())
			.then((manifest) => {
				const script = document.createElement('script');
				script.id = scriptId;
				script.crossOrigin = '';
				script.src = `${host}${manifest.files['main.js']}`;
				script.onload = () => {
					mountMicroFrontend();
				};
				document.head.appendChild(script);
			});

		return () => {
			w[`unmount${name}`] && w[`unmount${name}`](data);
		};
	}, []);

	return <main id={containerId} />;
};
