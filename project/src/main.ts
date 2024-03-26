/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { delay, Observable, of } from 'rxjs';

// 'of' creation operator example with delay
const ofExample$: Observable<string> = of('A1ice', 'Ben', 'Charlie');

const ofWithDelayExample$: Observable<string> = ofExample$.pipe(delay(3000));

console.log('Subscription init');
ofWithDelayExample$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: string): void => console.log('✔️ - Got value %O', value),
});
