import { Reducer } from 'redux';
import { ExampleState } from './example';
export interface StoreState {
    exampleState: ExampleState;
}
interface StoreReducer {
    exampleState: any;
}
export declare const rootReducer: () => Reducer<StoreReducer>;
export {};
