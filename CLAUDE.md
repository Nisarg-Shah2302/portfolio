# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server (default port 3000)
npm run lint      # Run ESLint
```

Docker (production, port 4000):
```bash
docker build -t next-portfolio .
docker run -p 4000:4000 next-portfolio
```

There are no tests in this project.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECTID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID=
NEXT_PUBLIC_FIREBASE_APPID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_RESEND_MAIL_API_KEY=
NEXT_PUBLIC_MAIL_FROM=
NEXT_PUBLIC_MAIL_TO=
```

## Architecture

**Data flow**: `app/page.tsx` (server component) fetches portfolio data from Firebase Realtime Database via REST (`NEXT_PUBLIC_FIREBASE_DATABASE_URL + '.json'`, `cache: 'no-store'`). It passes the entire `data` object to `app/HomePage.tsx` (client component), which distributes typed slices to each section component.

**Data source**: `data.json` is the seed/reference schema for Firebase Realtime Database — it is not used at runtime. The live data lives in Firebase and is imported there via the Firebase Console. To update portfolio content, edit the Firebase database directly (or re-import an updated `data.json`).

**Type contract**: `types/main.ts` defines the full `data` type tree. All components receive typed props derived from this root type. When adding new data fields, update both `data.json`, the Firebase database, and `types/main.ts`.

**Theme**: `next-themes` wraps the app in `app/ClientProvider.tsx` with `attribute='class'` and `defaultTheme='light'`. Dark mode uses Tailwind's `dark:` variant throughout.

**Analytics**: Two analytics systems run in parallel — Vercel Analytics (`@vercel/analytics`) rendered in `app/layout.tsx`, and Firebase Analytics initialized client-side in `components/FirebaseAnalytics.tsx` via a `useEffect` (safe-fails on localhost where Analytics requires HTTPS).

**Contact form**: `components/Contact.tsx` currently simulates submission with a `setTimeout`. The real `/api/mail` endpoint integration is commented out in that file — uncomment and wire the Resend API key when ready to enable actual email sending.

**Image domains**: External image hosts must be whitelisted in `next.config.js` under `images.domains`. Currently includes Cloudinary, Imgur, Firebase Storage, icons8, Freepik, and GeeksForGeeks.

**Section layout**: All page sections use `components/SectionWrapper.tsx` for consistent padding/spacing. Scroll navigation uses `react-scroll` with section `id` attributes matching header nav links.

**Component subdirectories**: Complex sections have their own subdirectory (`components/skills/`, `components/projects/`, `components/experiences/`) with internal subcomponents.
