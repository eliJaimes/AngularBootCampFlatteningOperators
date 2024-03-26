/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import { Observable, of } from 'rxjs';

// 'of' creation operator example
const ofExample$: Observable<string> = of('A1ice', 'Ben', 'Charlie');

ofExample$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: string): void => console.log('✔️ - Got value %O', value),
});
