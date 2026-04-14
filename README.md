# Solaris Shop — Flutter App Showcase

A visual showcase of a Flutter mobile e-commerce app running inside a phone frame. Tap products, switch tabs, add to cart — every interaction works. Material Design 3 styling throughout.

**Live demo:** https://shaisolaris.github.io/solaris-flutter-showcase/

## What it shows

- **Phone frame** (360×760) centered on a stack-focused landing page
- **Mini e-commerce app** inside the frame with 3 tabs:
  - **Home** — product grid, category chips, product detail view
  - **Cart** — add/remove items, quantity controls, subtotal/delivery/total
  - **Profile** — avatar, stats, settings menu
- **Material Design 3** — app bar, floating action button, chips, elevated cards, bottom navigation
- **Flutter blue** (`#0553B1`) and **Flutter cyan** (`#13B9FD`) throughout
- **Product detail view** with back button, hero, description, add-to-cart
- **Status bar** with time, signal, battery mock
- **Dark mode** toggle on the outer page
- Companion info on the left: stack chips, feature grid, what Flutter does well

## What this demo represents

This is the **visual proof** for a Flutter engagement. The real Flutter app (Dart source, `pubspec.yaml`, native builds) lives in the companion repositories. This showcase compiles the same UI concepts into a Next.js-hosted preview so clients can click through in the browser.

## Stack

- Next.js 15 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS 3
- Deployed to GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

## License

MIT.
