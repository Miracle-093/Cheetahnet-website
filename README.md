# CheetahNet Website

An immersive customer-acquisition website for CheetahNet fibre internet, built with Next.js, TypeScript, Tailwind CSS, React Three Fiber, Drei, Framer Motion, and Zod.

## Local development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example`. Never commit credentials.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Vercel staging deployment

1. Import `Miracle-093/Cheetahnet-website` into a new Vercel project.
2. Keep the framework preset set to Next.js and the root directory at the repository root.
3. Set `NEXT_PUBLIC_SITE_URL` to the assigned staging URL.
4. Set `LEAD_STORAGE_MODE=demo` until an approved lead-storage integration is configured.
5. Leave Git integration enabled: branches receive Preview deployments and `main` receives Production deployments for this staging project.
6. Do not attach `cheetahnet.co.ug` or any production domain to this project.

The provisional packages require CheetahNet approval before production use.
