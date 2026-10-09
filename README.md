# pawel-mikolajek

Personal site and digital CV for Paweł Mikołajek.

Stack: **Next.js 15 (App Router) + React 19 + Tailwind v4 + TypeScript**, with
Framer Motion for motion and `next-themes` for dark/light. The site is built as
a **static export** (`output: "export"`) and is deployable to GitHub Pages,
Cloudflare Pages, Netlify, Vercel, or any static host.

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build

```bash
npm run build      # → ./out (static export)
npm run serve:out  # → preview the static build locally
```

## Editing content

All copy lives in `/content/*.ts`. No CMS.

| File | What it controls |
| --- | --- |
| `content/profile.ts` | Name, tagline, location, About paragraphs, contact links |
| `content/projects.ts` | The 6 featured projects in Selected Work |
| `content/experience.ts` | Roles, dates, bullets |
| `content/testimonials.ts` | Quotes + attributions |
| `content/capabilities.ts` | Capability cards, tools strip, client list |

Change a file, save, the dev server hot-reloads.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.

If you deploy to `https://<user>.github.io/<repo>/` (a project page), set the
repo variable `NEXT_PUBLIC_BASE_PATH` to `/<repo>` so asset paths resolve
correctly. For a custom domain (or `<user>.github.io` apex), leave it unset.

```
Settings → Secrets and variables → Actions → Variables
NEXT_PUBLIC_BASE_PATH = /pawel-mikolajek    # only if needed
```

Then push to `main`. GitHub Pages must be enabled with the **GitHub Actions**
source under Settings → Pages.

## Future blog

MDX isn't wired in yet — when it's needed, drop posts into `/content/posts/`,
add a route at `app/blog/[slug]/page.tsx`, and reuse the existing
`<SectionHeading />` + Reveal primitives. The content-file pattern scales the
same way.
