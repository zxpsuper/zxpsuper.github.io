# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal blog (小皮咖) built with VuePress v1.x and the @vuepress/blog theme.

## Common Commands
- `npm run docs:dev`: Start the local development server
- `npm run docs:build`: Build the static site
- `npm run deploy`: Build and deploy the site (runs `docs:build` then `node publish.js`)

## Code Architecture
- **Content**: Blog posts are stored in `docs/_posts/` as Markdown files
- **Config**: VuePress configuration is in `docs/.vuepress/config.js`
- **Static Assets**: Public assets are in `docs/.vuepress/public/`
- **Components**: Custom Vue components are in `docs/.vuepress/components/`

## Key Files
- `package.json`: Project dependencies and scripts
- `docs/.vuepress/config.js`: VuePress and blog theme configuration
- `docs/.vuepress/enhanceApp.js`: App-level enhancements
