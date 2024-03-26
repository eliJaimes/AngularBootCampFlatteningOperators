/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Observable } from 'rxjs';

// Helper methods

const randomApiBaseURL: 'https://random-data-api.com/api/v2' =
	'https://random-data-api.com/api/v2' as const;

const getApiURL: (param: string) => string = (param: string): string => `
	${randomApiBaseURL}/${param}
`;

// 'ajax' creation operator example
const ajaxExample$: Observable<AjaxResponse<unknown>> = ajax(
	getApiURL('beers'),
);

ajaxExample$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: AjaxResponse<unknown>): void => {
		console.log('✔️ - Got value %O', value);
		const payload: unknown = value.response;
		console.log('payload: %O', payload);
	},
});
