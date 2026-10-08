# Yaroslav Krupoder — Personal Portfolio

Personal portfolio and developer showcase for [yaroslav-k-v.github.io](https://yaroslav-k-v.github.io).

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS (custom dark/light theme tokens)
- **Animations & Micro-interactions**: Framer Motion
- **Icons**: Lucide React + custom SVG brand icons
- **CI/CD**: GitHub Actions automated deployment to GitHub Pages

## Project Structure

```text
├── public/              # Static assets (robots.txt, sitemap.xml, 404.html redirect)
├── scripts/             # Build utilities (copy-routes.js for clean static routes)
├── src/
│   ├── components/      # Reusable UI components (Navbar, Footer, ProjectModal, Icons)
│   ├── data/            # Structured data (projects, experience, skills, contacts)
│   ├── views/           # Page views (HomeView, AboutView, ProjectsView, ResearchView, ContactsView)
│   ├── App.tsx          # Client-side router & theme manager
│   ├── main.tsx         # Application entry point
│   └── types.ts         # TypeScript definitions
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Typecheck and build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

Pushes to the `static` branch automatically trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the static bundle and deploys `dist/` directly to GitHub Pages.
