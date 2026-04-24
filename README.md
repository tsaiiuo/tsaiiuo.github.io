# Min-Huan Tsai Portfolio

Personal portfolio built with Next.js and prepared for GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

## GitHub Pages

This repo is configured to deploy automatically with GitHub Actions.

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub, open `Settings -> Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push again if needed. The workflow at `.github/workflows/deploy-pages.yml` will publish the site.

`next.config.ts` already handles both:

- `username.github.io` user sites
- project sites like `username.github.io/repo-name`
