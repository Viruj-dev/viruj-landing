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

- `src/components/LandingPage.tsx`: content, mobile navigation, app feature tabs, FAQ, and contact form.
- `src/app/globals.css`: responsive layout and visual styling.
- `src/data/destinations.ts`: verified provider portal and support contact links.
- `src/app/privacy/page.tsx`: notice for this website, separate from product policies.

App access and provider demos open email drafts to `help@virujhealth.com`. There is no fake store download link or automatic form submission. Visitors can review and copy the prepared message before sending it. Update app access destinations when public store links are confirmed.

## Mobile screenshots

Set `NEXT_PUBLIC_PLAY_STORE_URL` to the published listing when ready. Until then, the user option in the Get started dialog shows “Play Store link coming soon”; providers can open the ERP.

`public/screens/mobile` contains fresh captures of the sibling `Viruj-Mobile-app` at 390 × 844, using **Sample data preview (offline)**. The page labels these as sample data. They contain no real patient information. Re-capture screens from the mobile preview when the app design changes.

## Scope

The page describes care discovery, appointment requests and tracking, AI information, community, and organization access. It does not claim automatic medical-record imports, live telemedicine, store availability, adoption numbers, or certifications. Provider workflows depend on organization type and enabled tools; the demo path lets teams check their requirements.
