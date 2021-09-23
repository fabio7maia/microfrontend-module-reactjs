/* eslint-disable no-console */
export const useLogger = () => {
	return (message: any, ...args: any[]) => console.log(message, args);
};
