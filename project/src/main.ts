/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { ajax, AjaxResponse } from 'rxjs/ajax';
import { fromEvent, map, merge, Observable } from 'rxjs';

// References to UI buttons

const $beerButton: HTMLButtonElement = document.querySelector(
	'[data-beer]',
) as HTMLButtonElement;

const $userButton: HTMLButtonElement = document.querySelector(
	'[data-user]',
) as HTMLButtonElement;

const $creditCardButton: HTMLButtonElement = document.querySelector(
	'[data-credit-card]',
) as HTMLButtonElement;

// Observables that respond to clicks on buttons but map the data

const beerButton$: Observable<'beers'> = fromEvent<MouseEvent>(
	$beerButton,
	'click',
).pipe(map((): 'beers' => 'beers'));

const userButton$: Observable<'users'> = fromEvent<MouseEvent>(
	$userButton,
	'click',
).pipe(map((): 'users' => 'users'));

/* FIXME: it wasn't 'credit-cards' but 'credit_cards' */

const creditCardButton$: Observable<'credit_cards'> = fromEvent<MouseEvent>(
	$creditCardButton,
	'click',
).pipe(map((): 'credit_cards' => 'credit_cards'));

type ButtonsPayloadT = 'beers' | 'users' | 'credit_cards';

const allButton$: Observable<ButtonsPayloadT> = merge(
	beerButton$,
	userButton$,
	creditCardButton$,
);

// Helper methods

const randomApiBaseURL: 'https://random-data-api.com/api/v2' =
	'https://random-data-api.com/api/v2' as const;

const getApiURL: (param: string) => string = (param: string): string => `
	${randomApiBaseURL}/${param}
`;

// Call API when user clicks on a button

/* FIXME: have nested subscriptions is definitely a bad practice */

allButton$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: ButtonsPayloadT): void => {
		console.log('✔️ - Got value %O', value);

		const ajaxExample$: Observable<AjaxResponse<unknown>> = ajax(
			getApiURL(value),
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
	},
});
