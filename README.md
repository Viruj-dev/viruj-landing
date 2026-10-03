# Viruj landing page

A plain-language site for the patient app and provider workspace. Built with Next.js, React, the existing fonts, and Lucide icons. The active page does not use the old animated sections or preloader.

## Run

```sh
npm install
npm run dev
```

## Check

```sh
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Node 24 runs the small contact-draft test without a TypeScript test runner.

## Edit

- `src/components/LandingPage.tsx`: content, mobile navigation, waitlist modal, app feature tabs, About & Coverage, FAQ, and contact form.
- `src/app/globals.css`: responsive layout, design system tokens, and visual styling.
- `src/app/api/waitlist/route.ts`: early access patient waitlist capture.
- `src/app/api/contact/route.ts`: direct inquiry and provider demo submission handler.
- `src/app/privacy-policy/page.tsx`: App Privacy Policy (DPDP Act 2023 & Play Store compliant).
- `src/app/terms/page.tsx`: Terms of Use.
- `src/app/privacy/page.tsx`: Website privacy notice.
- `src/data/destinations.ts`: verified provider portal and support contact links.

Tagline is unified as **"Your care. All together."** across all page metadata, OpenGraph, Twitter, hero, and footer. The patient path captures early access waitlist entries directly to storage instead of bouncing users to mailto links.

## Mobile screenshots

Set `NEXT_PUBLIC_PLAY_STORE_URL` to the published listing when ready. Until then, patient users are invited to join the early access waitlist to be notified upon rollout.

`public/screens/mobile` contains captures of the sibling `Viruj-Mobile-app` at 390 × 844, using **Sample data preview (offline)**. The page labels these as sample data. They contain no real patient information. Re-capture screens from the mobile preview when the app design changes.

## Scope

The page describes care discovery across departments, appointment requests and tracking, AI information, community, and organization access. Operational coverage is focused on Noida, Greater Noida, and Ghaziabad with regional expansion planned. Provider workflows depend on organization type and enabled tools; the demo path lets teams check their requirements.
