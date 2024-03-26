/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { ajax, AjaxResponse } from 'rxjs/ajax';
import {
	catchError,
	concatMap,
	EMPTY,
	fromEvent,
	map,
	merge,
	Observable,
} from 'rxjs';

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

const creditCardButton$: Observable<'credit_cards'> = fromEvent<MouseEvent>(
	$creditCardButton,
	'click',
).pipe(map((): 'credit_cards' => 'credit_cards'));

// Helper methods

const randomApiBaseURL: 'https://random-data-api.com/api/v2' =
	'https://random-data-api.com/api/v2' as const;

const getApiURL: (param: string) => string = (param: string): string => `
	${randomApiBaseURL}/${param}
`;

type ButtonsPayloadT = 'beers' | 'users' | 'credit_cards';

const allButton$: Observable<ButtonsPayloadT> = merge(
	beerButton$,
	userButton$,
	creditCardButton$,
);

// 'concatMap' pipeable operator example

allButton$
	.pipe(
		// Projects each source value to an Observable which is merged in the output
		// Observable, in a serialized fashion waiting for each one to complete before
		// merging the next
		concatMap(
			(value: ButtonsPayloadT): Observable<AjaxResponse<unknown>> =>
				ajax(getApiURL(value)),
		),
		// Catches errors on the observable to be handled by returning a new observable
		// or throwing an error
		// catchError((): Observable<never> => EMPTY),
	)
	.subscribe({
		complete: (): void => console.log('✅ - Done'),
		error: (error: Error): void =>
			console.error('❌ - Something wrong occurred: %O', error),
		next: (value: AjaxResponse<unknown> | {}): void =>
			console.log('✔️ - Got value %O', value),
	});
