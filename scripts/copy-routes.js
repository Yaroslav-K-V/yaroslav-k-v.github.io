import fs from 'fs';
import path from 'path';

const ROUTE_METADATA = {
  about: {
    title: 'About — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/about/',
    url: 'https://yaroslav-k-v.github.io/about/',
    description:
      'About Yaroslav Krupoder — Software Engineering student, Grenergy LLC internship, technical background, and skills.',
  },
  projects: {
    title: 'Projects — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/projects/',
    url: 'https://yaroslav-k-v.github.io/projects/',
    description:
      'Portfolio of software projects by Yaroslav Krupoder: meetbadi, Unitra, HotspotGuard, PyGlow, and data science notebooks.',
  },
  contacts: {
    title: 'Contacts — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/contacts/',
    url: 'https://yaroslav-k-v.github.io/contacts/',
    description:
      'Get in touch with Yaroslav Krupoder — email, Telegram, LinkedIn, phone, and resume.',
  },
};

function customizeHtml(html, meta) {
  let result = html;

  result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  result = result.replace(
    /<link\s+[^>]*rel=["']canonical["'][^>]*\/?>/i,
    `<link rel="canonical" href="${meta.canonical}" />`
  );

  result = result.replace(
    /<meta\s+[^>]*property=["']og:url["'][^>]*\/?>/i,
    `<meta property="og:url" content="${meta.url}" />`
  );

  result = result.replace(
    /<meta\s+[^>]*property=["']og:title["'][^>]*\/?>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );

  result = result.replace(
    /<meta\s+[^>]*name=["']twitter:title["'][^>]*\/?>/i,
    `<meta name="twitter:title" content="${meta.title}" />`
  );

  result = result.replace(
    /<meta\s+[^>]*name=["']description["'][^>]*\/?>/i,
    `<meta name="description" content="${meta.description}" />`
  );

  result = result.replace(
    /<meta\s+[^>]*property=["']og:description["'][^>]*\/?>/i,
    `<meta property="og:description" content="${meta.description}" />`
  );

  result = result.replace(
    /<meta\s+[^>]*name=["']twitter:description["'][^>]*\/?>/i,
    `<meta name="twitter:description" content="${meta.description}" />`
  );

  return result;
}

const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  for (const [route, meta] of Object.entries(ROUTE_METADATA)) {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const routeHtml = customizeHtml(indexHtml, meta);
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
    console.log(`Created static route: dist/${route}/index.html with custom SEO metadata`);
  }
} else {
  console.error(`Error: ${indexHtmlPath} not found. Run vite build first.`);
  process.exit(1);
}
