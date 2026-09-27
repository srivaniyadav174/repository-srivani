# Srivani Golla Portfolio

A responsive portfolio for Srivani Golla, Software Developer and Computer Science Engineering Student. Portfolio details are centralized in `src/data/portfolio.js` and use the information supplied for this site.

## Features

- Responsive sections for about, skills, development workflow, experience, projects, education, certifications, achievements, coding profiles, and contact.
- Accessible mobile navigation, keyboard-operable project detail dialogs, active-section navigation, and reduced-motion support.
- Persistent light/dark theme with system preference support and an early theme initialization to prevent a flash.
- Project details show no repository or demo actions until real URLs are added.
- Contact form opens a prefilled email in the visitor's email application; it does not claim or simulate delivery.
- Resume download appears only when an actual PDF URL is configured.

## Tech Stack

- Vue 3
- Vite
- `@lucide/vue` icons

## Project Structure

```text
public/
	favicon.svg
	robots.txt
	sitemap.xml
src/
	data/portfolio.js  # Portfolio content and central link/resume configuration
	App.vue            # Page sections and interactions
	main.js            # Vue entry point
	style.css          # Responsive styles, themes, and motion
```

## Local Development

Install Node.js LTS, then run:

```sh
npm install
npm run dev
```

Create the production bundle and inspect it locally with:

```sh
npm run build
npm run preview
```

## Update Portfolio Details

Edit `src/data/portfolio.js` to update the personal details, skills, experience, projects, education, certifications, achievements, soft skills, and profile links. Project repository and live-demo buttons are omitted unless `githubUrl` or `demoUrl` contains a real URL.

The `portfolioConfig` object in the same file centralizes `SITE_URL`, `RESUME_URL`, `EMAIL`, `PHONE`, `GITHUB_URL`, `LINKEDIN_URL`, and `LEETCODE_URL`.

To add a resume, place the real PDF under `public/resume/` (for example, `public/resume/Srivani-Golla-Resume.pdf`) and set `RESUME_URL` to `/resume/Srivani-Golla-Resume.pdf`. The download button stays hidden while `RESUME_URL` is empty.

The contact form uses the configured email address with a `mailto:` link. It does not send messages through a backend.

## Deployment

For a Render Static Site, use:

- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variables: none required

For the existing Render Node Web Service configuration, use the same build command and this start command:

```sh
npm run preview -- --host 0.0.0.0 --port $PORT
```

The Vite preview host allowlist is configured in `vite.config.js` for the Render hostname.
