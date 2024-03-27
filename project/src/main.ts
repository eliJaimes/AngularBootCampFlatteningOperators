/* ••[1]••••••••••••••••••••••••• main.ts •••••••••••••••••••••••••••••• */

import {
	concatMap,
	exhaustMap,
	fromEvent,
	interval,
	mergeMap,
	Observable,
	switchMap,
	take,
	tap,
} from 'rxjs';

const $button: HTMLButtonElement = document.querySelector(
	'button',
) as HTMLButtonElement;

console.log('$button: %O', $button);

const buttonClick$: Observable<MouseEvent> = fromEvent<MouseEvent>(
	$button,
	'click',
);

const interval$: Observable<number> = interval(1000).pipe(
	// Emits only the first count values emitted by the source Observable.
	take(3),
);

/* ••[2]•••••••••• interval$ ••••••••••••••• * /

interval$.subscribe({
	complete: (): void => console.log('✅ - Done'),
	error: (error: Error): void =>
		console.error('❌ - Something wrong occurred: %O', error),
	next: (value: number): void =>
		console.log('✔️ - Got value from interval$: %O', value),
});

/* ••[2]•••••••••• concatMap ••••••••••••••• * /

buttonClick$
	.pipe(
		// Used to perform side-effects for notifications from the source observable
		tap((): void => console.log('%c\nButton clicked', 'color: SpringGreen')),
		// Projects each source value to an Observable which is merged in the output
		// Observable, in a serialized fashion waiting for each one to complete before
		// merging the next
		concatMap((): Observable<number> => interval$),
	)
	.subscribe({
		complete: (): void => console.log('✅ - Done'),
		error: (error: Error): void =>
			console.error('❌ - Something wrong occurred: %O', error),
		next: (value: number): void =>
			console.log('✔️ - Got value from concatMap: %O', value),
	});

/* ••[2]•••••••••• switchMap ••••••••••••••• * /

buttonClick$
	.pipe(
		// Used to perform side-effects for notifications from the source observable
		tap((): void => console.log('%c\nButton clicked', 'color: SpringGreen')),
		// Projects each source value to an Observable which is merged in the output
		// Observable, emitting values only from the most recently projected Observable
		switchMap((): Observable<number> => interval$),
	)
	.subscribe({
		complete: (): void => console.log('✅ - Done'),
		error: (error: Error): void =>
			console.error('❌ - Something wrong occurred: %O', error),
		next: (value: number): void =>
			console.log('✔️ - Got value from switchMap: %O', value),
	});

/* ••[2]•••••••••• mergeMap ••••••••••••••• * /

buttonClick$
	.pipe(
		// Used to perform side-effects for notifications from the source observable
		tap((): void => console.log('%c\nButton clicked', 'color: SpringGreen')),
		// Projects each source value to an Observable which is merged in the output
		// Observable
		mergeMap((): Observable<number> => interval$),
	)
	.subscribe({
		complete: (): void => console.log('✅ - Done'),
		error: (error: Error): void =>
			console.error('❌ - Something wrong occurred: %O', error),
		next: (value: number): void =>
			console.log('✔️ - Got value from mergeMap: %O', value),
	});

/* ••[2]•••••••••• exhaustMap ••••••••••••••• * /

buttonClick$
	.pipe(
		// Used to perform side-effects for notifications from the source observable
		tap((): void => console.log('%c\nButton clicked', 'color: SpringGreen')),
		// Projects each source value to an Observable which is merged in the output
		// Observable only if the previous projected Observable has completed
		exhaustMap((): Observable<number> => interval$),
	)
	.subscribe({
		complete: (): void => console.log('✅ - Done'),
		error: (error: Error): void =>
			console.error('❌ - Something wrong occurred: %O', error),
		next: (value: number): void =>
			console.log('✔️ - Got value from exhaustMap: %O', value),
	});

/* */
