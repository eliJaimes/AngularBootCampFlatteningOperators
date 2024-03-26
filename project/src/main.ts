/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { fromEvent, Observable } from 'rxjs';

const $button: HTMLButtonElement = document.querySelector(
	'button',
) as HTMLButtonElement;

console.log('$button: %O', $button);

// 'fromEvent' creation operator example
const fromEventExample$: Observable<MouseEvent> = fromEvent<MouseEvent>(
	$button,
	'click',
);

fromEventExample$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: MouseEvent): void => console.log('✔️ - Got value %O', value),
});
