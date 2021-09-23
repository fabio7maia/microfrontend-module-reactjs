import { Action, action, PayloadAction } from 'typesafe-actions';
import { ExampleActionTypes } from './example.types';

export const saveCustomerPersonalData = (data: any): PayloadAction<string, any> =>
	action(ExampleActionTypes.saveCustomerPersonalData, data);
