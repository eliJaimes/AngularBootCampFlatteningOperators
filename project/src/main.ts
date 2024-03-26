/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { fromEvent, map, merge, Observable } from 'rxjs';

// 'merge' creation operator example

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

const creditCardButton$: Observable<'credit-cards'> = fromEvent<MouseEvent>(
	$creditCardButton,
	'click',
).pipe(map((): 'credit-cards' => 'credit-cards'));

type ButtonsPayloadT = 'beers' | 'users' | 'credit-cards';

const allButton$: Observable<ButtonsPayloadT> = merge(
	beerButton$,
	userButton$,
	creditCardButton$,
);

allButton$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: ButtonsPayloadT): void =>
		console.log('✔️ - Got value %O', value),
});
