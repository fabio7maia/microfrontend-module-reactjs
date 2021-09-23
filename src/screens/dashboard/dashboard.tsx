import React from 'react';
import { useLogger } from '@hooks';
import { useSelector } from 'react-redux';
import { MicroFrontend } from '../../microfrontend';

export interface DashboardProps {
	numberOfWidgets: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ numberOfWidgets, children }) => {
	const storeState = useSelector((state) => state);
	const logger = useLogger();

	logger('DashboardScreen > render');

	return (
		<div>
			<h1>Dashboard</h1>
			<h3>Isto é o dashboard!</h3>
			<code style={{ wordBreak: 'break-all' }}>{JSON.stringify(storeState)}</code>
			<div>{numberOfWidgets}</div>
			{children && <div>{children}</div>}
		</div>
	);
};

export default MicroFrontend.export(Dashboard);
