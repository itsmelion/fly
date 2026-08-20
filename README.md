# Chris FE assignment (Fly app)

Available on:
- Web app: [chrisfly.netlify.app](https://chrisfly.netlify.app)
- Storybook: [chrisflystorybook.netlify.app](https://chrisflystorybook.netlify.app)

Ported my old personal eslint rules from [eslint-config-lion](https://www.npmjs.com/package/eslint-config-lion)

## Quick Start

```sh
git clone https://github.com/itsmelion/fly.git chrisfly
cd chrisfly
yarn install
```
`yarn dev` or `yarn storybook`

### Common commands

| Task               | Command                       |
| ------------------ | ----------------------------- |
| Start dev server   | `npx nx run @fly/web:dev`     |
| Build all projects | `npx nx run-many -t build`    |
| Run all tests      | `npx nx run-many -t test`     |
| Run affected tests | `npx nx affected -t test`     |
| Lint affected      | `npx nx affected -t lint`     |
| View project graph | `npx nx graph`                |
| E2E tests          | `npx nx run @fly/web-e2e:e2e` |

---

## What's inside

```
fly/
- apps/
  - web/             Next.js 16 App Router application (scope:web)
  - web-e2e/         Playwright end-to-end tests
- packages/
  - ui/              Shared React component library (scope:shared)
  - services/        Services and API calls and transformers
  - eslint-config/   lint config ensuring consistency and quality.
```

### Key choices

- **Next.js 16 App Router** with `src/` directory layout
- **TypeScript** throughout - strict mode enabled
- **Jest** for unit tests, **Playwright** for e2e
- **ESLint** with module boundary enforcement (tags: `scope:web`, `scope:shared`)
- **yarn** as package manager
- **Storybook** to keep track of components
- **Tanstack (react-query) (virtual)** for performant API management and virtualized lists

---
