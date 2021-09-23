import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { MicroFrontend, MicroFrontendProps } from './microFrontend.component';

interface MicroFrontendRoutesProps extends MicroFrontendProps {
	routePath: string;
}

export const MicroFrontendRoutes: React.FC<MicroFrontendRoutesProps> = (props) => {
	let { routePath } = props;

	routePath = routePath.substr(routePath.length - 2) === '/' ? routePath.substr(0, routePath.length - 2) : routePath;

	return (
		<>
			<Route exact path={routePath} render={() => <MicroFrontend {...props} />} />
			<Route exact path={`${routePath}/*`} render={() => <MicroFrontend {...props} />} />
		</>
	);
};
