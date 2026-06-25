# Repository Guidelines

## Project Structure & Module Organization
- `src/main.tsx` bootstraps the React app and loads `src/App.tsx`.
- `src/components/` holds UI sections such as `LandingPage.tsx` and `LanguageSelector.tsx`.
- `src/lib/` contains shared logic for analytics, live chat, locale handling, constants, and motion helpers.
- `public/images/` stores static assets used by the landing page. Keep new media here and reference it with root-relative paths like `/images/banner-1.png`.
- `vite.config.ts` and `tsconfig.json` define the build and TypeScript setup.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the Vite development server.
- `npm run build` type-checks with `tsc --noEmit` and creates a production build.
- `npm run preview` serves the built app locally for final verification.

## Coding Style & Naming Conventions
- Use TypeScript and React function components.
- Follow the existing style: 2-space indentation, double quotes, semicolons omitted, and trailing commas where Prettier-like formatting already appears.
- Use `PascalCase` for components, `camelCase` for functions, variables, and hooks, and `UPPER_SNAKE_CASE` for shared constants.
- Keep shared values in `src/lib/` and UI-specific code in `src/components/`.

## Testing Guidelines
- There is no automated test suite configured in this repository yet.
- Use `npm run build` as the minimum validation step before opening a pull request.
- If you add tests, place them close to the feature or under a future `tests/` directory and use descriptive names such as `LandingPage.test.tsx`.

## Commit & Pull Request Guidelines
- Commit history uses short, imperative, lower-case messages such as `fix mobile ui navigation` and `add analytics`.
- Keep commits focused on one change when possible.
- Pull requests should include a clear summary, the user-visible impact, and screenshots or screen recordings for UI changes.
- Link related issues or tasks when available.

## Configuration & Content Notes
- Analytics and live chat are initialized from `src/lib/analytics.ts` and `src/lib/liveChat.ts`; review these files before changing third-party scripts.
- Avoid hardcoding environment-specific values in components. Put reusable URLs and constants in `src/lib/constants.ts`.
