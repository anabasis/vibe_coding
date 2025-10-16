# README

## 초기설치

```bash
npx create-next-app@latest --ts --eslint --tailwind --src-dir --app --turbopack --yes 2-my_-_app
```

## Vercel에 배포

```bash
npm install -g vercel

vercel login
> Continue with Google

vercel --prod

## 결과
Vercel CLI 48.3.0
? Set up and deploy “~/Working/Repos/Github/vibe_coding/02-my_app”? yes
? Which scope should contain your project? anabasis's projects
? Link to existing project? no
? What’s your project’s name? anabasis-linktree
? In which directory is your code located? ./
Local settings detected in vercel.json:
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Development Command: next dev --port $PORT
- Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
- Output Directory: Next.js default
? Want to modify these settings? no
? Do you want to change additional project settings? no
🔗  Linked to anabasis01-1353s-projects/anabasis-linktree (created .vercel)
🔍  Inspect: https://vercel.com/anabasis01-1353s-projects/anabasis-linktree/AFYk5HJ436J379bVHzCNHY96siE8 [6s]
✅  Production: https://anabasis-linktree-412jn5nt2-anabasis01-1353s-projects.vercel.app [6s]

```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
