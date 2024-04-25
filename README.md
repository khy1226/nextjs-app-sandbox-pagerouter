This is a starter template for [Learn Next.js](https://nextjs.org/learn).
### Commands
- To create the next application template
```shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
```

- You should also update the following files:
	- `public/images/profile.jpg` with your photo (Recommended: 400px width/height).
	- `const name = '[Your Name]'` in `components/layout.js` with your name.
	- `<p>[Your Self Introduction]</p>` in `pages/index.js` with your self introduction.

- Will need to check the `dependencies` in the `package.json` and also `package-lock.json` file
```json
{
	"private": true,
	"scripts": {
		"build": "next build",
		"dev": "next dev",
		"start": "next start"
	},

	"dependencies": {
		"date-fns": "^3.6.0",
		"gray-matter": "^4.0.3",
		"next": "latest",
		"react": "18.2.0",
		"react-dom": "18.2.0",
		"remark": "^15.0.1",
		"remark-html": "^16.0.1"
	},
	
	"engines": {
		"node": ">=18"
	}
}```

