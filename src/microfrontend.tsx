import React from 'react';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';

interface MicroFrontendInitMethodInput<TStoreState> {
	store: Store<TStoreState, AnyAction>;
}

interface MicroFrontendInnerData {
	init: boolean;
	saveData: Partial<MicroFrontendInitMethodInput<any>>;
}

const __microFrotend__: MicroFrontendInnerData = {
	init: false,
	saveData: {
		store: undefined,
	},
};

const _checkInitialization = (): void => {
	if (!__microFrotend__.init) {
		throw new Error(`It's required initialize micro frontend library first!`);
	}
};

export const MicroFrontend = {
	export: (Component: React.ComponentType<any>) => (props: any) => {
		return (
			<Provider store={props.store}>
				<Component {...props} />
			</Provider>
		);
	},
	import: (lazyFn: React.LazyExoticComponent<React.ComponentType<any>>): React.ReactNode => {
		const Component = lazyFn;

		return (): React.ReactNode => {
			_checkInitialization();

			return (
				<>
					<React.Suspense fallback={<></>}>
						<Component store={__microFrotend__.saveData.store} />
					</React.Suspense>
				</>
			);
		};
	},
	init: <TStoreState extends any>({ store }: MicroFrontendInitMethodInput<TStoreState>): void => {
		__microFrotend__.saveData = {
			store,
		};
		__microFrotend__.init = true;
	},
};
