# First commit

# Create Vite Project

```shell
npm init vite@latest
> Need to install the following packages:
> create-vite@5.2.3
> Ok to proceed? (y) y
> √ Project name: ... project
> √ Select a framework: » Vanilla
> √ Select a variant: » TypeScript

Scaffolding project in D:\Apex v2\Angular boot camp\Flattening operators\project...

Done. Now run:

  cd project
  npm install
  npm run dev
```

# Do clean up

- Remove unnecessary files
- Clean up index.html, main.ts and style.css

# Install Tailwind CSS

https://tailwindcss.com/docs/guides/vite

```shell
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

On 'project/tailwind.config.js' set

```js
/* ••[1]••••••••••••••••••••••••• tailwind.config.js •••••••••••••••••••••••••••••• */

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.ts'],
	theme: {
		extend: {},
	},
	plugins: [],
};
```

On 'project/src/style.css' include

```css
/* ••[1]••••••••••••••••••••••••• style.css •••••••••••••••••••••••••••••• */

@tailwind base;

@tailwind components;

@tailwind utilities;
```

# Add RxJs to the project

```shell
npm i rxjs
```

# 'of' creation operator example

# 'of' creation operator example with delay

# 'fromEvent' creation operator example

# 'ajax' creation operator example

https://random-data-api.com/documentation

# 'map' pipeable operator example

# 'merge' creation operator example

# Call API when user clicks on a button

# Call API when user clicks on a button (refactor)

# 'mergeAll' pipeable operator example

# 'concatMap' pipeable operator example

# 'switchMap' pipeable operator example

# 'mergeMap' pipeable operator example

# 'exhaustMap' pipeable operator example

# 'concatMap', 'switchMap', 'mergeMap', 'exhaustMap' pipeable operator comparison
