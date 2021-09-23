/// <reference types="react" />
import { AnyAction, Store } from 'redux';
interface MicroFrontendInitMethodInput<TStoreState> {
    store: Store<TStoreState, AnyAction>;
}
export declare const MicroFrontend: {
    export: (Component: any) => (props: any) => JSX.Element;
    import: (lazyFn: any) => any;
    init: <TStoreState extends unknown>({ store }: MicroFrontendInitMethodInput<TStoreState>) => void;
};
export {};
