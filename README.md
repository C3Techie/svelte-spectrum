# CCC.DEV - The Nexus Portfolio

A highly interactive, cinematic, futuristic, production-grade developer portfolio built with SvelteKit, showcasing frontend engineering mastery and advanced animation systems.

## 🚀 Architecture Overview

This project uses a modular and scalable architecture:

- **Framework**: SvelteKit for server-side rendering and routing.
- **Styling**: Tailwind CSS v4 with a custom tokenized theme system.
- **Animations**: GSAP (GreenSock) for cinematic timelines and scroll-driven reveals.
- **3D Graphics**: Threlte (Three.js for Svelte) for performant WebGL interactions.
- **Icons**: Lucide Svelte for lightweight, consistent iconography.

### Directory Structure

```text
src/
├── lib/
│    ├── components/
│    │    ├── layout/       # Navbar, Footer, Background
│    │    ├── sections/     # Hero, About, ProjectGrid, Skills, Contact
│    │    ├── terminal/     # Interactive Terminal UI
│    │    └── three/        # WebGL / Threlte 3D scenes
│    ├── stores/            # Global Svelte stores (e.g., terminal state)
│    └── data/              # Mock data (projects, skills, metadata)
├── routes/
│    ├── +page.svelte       # Main landing page orchestration
│    ├── +layout.svelte     # Global layout wrapper
│    └── layout.css         # Global styles and Tailwind configuration
└── app.html                # HTML entry point with font preloads
```

## 🎨 Design System

The visual DNA is strictly based on a futuristic, terminal-inspired aesthetic:

- **Colors**: Deep surfaces (`#0d1516`), cyan primary accents (`#00daf3`), and lavender secondary accents (`#cdbdff`).
- **Typography**: 
  - `Geist` for massive, tight-tracking display headers.
  - `JetBrains Mono` for code snippets, labels, and the terminal interface.
  - `Inter` for highly legible body copy.
- **Motifs**: Glassmorphism (`backdrop-blur`), glowing borders, terminal block decorators, and pulsing status indicators.

## 🎬 Animation Strategy

Animations are orchestrated using **GSAP**:
- **Hero Reveal**: A timeline-based staggered cinematic entrance on load.
- **Scroll Storytelling**: `ScrollTrigger` is used to fade and slide up components (projects, skills, contact elements) as they enter the viewport.
- **Micro-interactions**: Tailwind CSS transitions are used for hover states, card tilts, and button glows to ensure zero layout shift and high performance.

## ⚡ Performance Optimizations

To ensure a Lighthouse score > 90:
- **WebGL Scoping**: The Threlte 3D canvas is restricted to the Hero section to prevent heavy GPU usage across the entire scrolling page.
- **CSS-Only Glows**: Background ambient glows are achieved using pure CSS `box-shadow` and `filter: blur()`, avoiding expensive canvas rendering for simple gradients.
- **Font Preloading**: Critical Google Fonts are preconnected and preloaded in `app.html`.
- **SSR Compatibility**: All GSAP animations and WebGL contexts are safely initialized in `onMount` to prevent Server-Side Rendering (SSR) hydration mismatches.

## 🧠 Creative Features (Stage 5b)

This portfolio exceeds the requirement of one creative feature by implementing several advanced systems:

1.  **Interactive Terminal (CCC.OS)**: A custom-built command palette and shell. Use `Ctrl+K` to open. Supports standard commands like `ls`, `dir`, `whoami`, `cat`, and `cd [section]` for keyboard-driven navigation.
2.  **AI Portfolio Assistant (Nexus AI)**: A sophisticated assistant integrated with **Groq (Llama 3)** for real-time interaction. It provides context-aware answers about projects, skills, and contact info.
3.  **Dynamic Theming**: Support for both **Dark** and **Light** modes with persistence and system preference synchronization.
4.  **3D / WebGL Atmosphere**: A performant Threlte (Three.js) scene in the Hero section providing depth and cinematic visual rhythm.

## 📧 Contact API (Resend)

The contact form is powered by a production-ready **SvelteKit API Route** (`/api/contact`) integrated with **Resend**. It includes server-side validation and secure credential handling.

## ♿ Accessibility Considerations
- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<section>`, `<header>`, and `<footer>`.
- **Keyboard Navigation**: The Terminal can be toggled via `Ctrl+K`. The mobile menu dialog and terminal can be dismissed via the `Escape` key.
- **Focus States**: Custom `:focus-visible` outlines applied globally.
- **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)`.

## 🛠️ Setup Instructions

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Environment Setup**: Create a `.env` file in the root:
   ```env
   RESEND_API_KEY=your_key_here
   GROQ_API_KEY=your_groq_key_here
   ```
4. **Start development**: `npm run dev`
4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌍 Deployment

This project is configured to be deployed easily on **Vercel**, **Netlify**, or **Cloudflare Pages** using the standard `@sveltejs/adapter-auto`.

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel/Netlify.
3. The build command (`npm run build`) and output directory will be automatically detected.

## ⚖️ Trade-offs
- **GSAP over native Svelte transitions**: While Svelte's native transitions are lighter, GSAP was chosen to allow for complex, coordinated scroll-driven timelines (`ScrollTrigger`) which are essential for the "cinematic" feel.
- **Tailwind v4 `@theme`**: Using the latest Tailwind version means `@apply` constraints (e.g., avoiding modifier classes like `group` inside `@apply`). Classes are kept inline in HTML to favor composition over abstraction.
