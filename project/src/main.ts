/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { fromEvent, map, Observable } from 'rxjs';

// 'map' pipeable operator example

const $beerButton: HTMLButtonElement = document.querySelector(
	'[data-beer]',
) as HTMLButtonElement;

console.log('$beerButton: %O', $beerButton);

const beerButton$: Observable<'beer'> = fromEvent<MouseEvent>(
	$beerButton,
	'click',
).pipe(map((): 'beer' => 'beer'));

beerButton$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: 'beer'): void => console.log('✔️ - Got value %O', value),
});
