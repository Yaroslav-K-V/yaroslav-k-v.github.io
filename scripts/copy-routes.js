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
  'projects/meetbadi': {
    title: 'meetbadi.com — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/projects/meetbadi/',
    url: 'https://yaroslav-k-v.github.io/projects/meetbadi/',
    description:
      'Live meeting platform: full-stack internship contribution with React, Chrome MV3 extension, and Supabase / PostgreSQL backend.',
    image: 'https://yaroslav-k-v.github.io/meetbadi-poster.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'meetbadi.com',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Chrome Extension',
      description: 'Production meeting platform with browser context capture, LLM note generation, and PostgreSQL RLS security.',
      author: {
        '@type': 'Person',
        name: 'Yaroslav Krupoder',
        url: 'https://yaroslav-k-v.github.io/'
      }
    }
  },
  'projects/unitra': {
    title: 'Unitra — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/projects/unitra/',
    url: 'https://yaroslav-k-v.github.io/projects/unitra/',
    description:
      'AI-powered Python Unit Test Generator desktop application utilizing AST analysis, LLM prompt engineering, and pywebview.',
    image: 'https://yaroslav-k-v.github.io/og-cover.png',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Unitra',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Windows, Linux',
      description: 'AI-powered Python Unit Test Generator using AST parsing and LLM orchestration.',
      author: {
        '@type': 'Person',
        name: 'Yaroslav Krupoder',
        url: 'https://yaroslav-k-v.github.io/'
      }
    }
  },
  'projects/pyglow': {
    title: 'PyGlow — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/projects/pyglow/',
    url: 'https://yaroslav-k-v.github.io/projects/pyglow/',
    description:
      'Minimal Python code editor with PySide6 (Qt) UI, Pygments tokenization, and local LLM autocomplete.',
    image: 'https://yaroslav-k-v.github.io/pyglow-poster.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'PyGlow',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      description: 'Minimal Python Code Editor with syntax highlighting and local AI autocomplete.',
      author: {
        '@type': 'Person',
        name: 'Yaroslav Krupoder',
        url: 'https://yaroslav-k-v.github.io/'
      }
    }
  },
  'projects/applied-data-science': {
    title: 'Applied Data Science — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/projects/applied-data-science/',
    url: 'https://yaroslav-k-v.github.io/projects/applied-data-science/',
    description:
      'Exploratory Data Analysis with Python — Jupyter Notebook with vectorized NumPy/Pandas analysis and statistical charts.',
    image: 'https://yaroslav-k-v.github.io/og-cover.png',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: 'Applied Data Science Notebook',
      learningResourceType: 'Data Analysis Notebook',
      description: 'Exploratory Data Analysis with Python, Pandas, NumPy, and statistical plotting.',
      author: {
        '@type': 'Person',
        name: 'Yaroslav Krupoder',
        url: 'https://yaroslav-k-v.github.io/'
      }
    }
  },
  'projects/hotspotguard': {
    title: 'HotspotGuard — Yaroslav Krupoder',
    canonical: 'https://yaroslav-k-v.github.io/projects/hotspotguard/',
    url: 'https://yaroslav-k-v.github.io/projects/hotspotguard/',
    description:
      'macOS menu bar Wi-Fi watchdog monitoring true end-to-end reachability — built with Swift and SwiftUI.',
    image: 'https://yaroslav-k-v.github.io/hotspot-poster.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'HotspotGuard',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'macOS',
      description: 'macOS Wi-Fi watchdog monitoring active network reachability via TCP handshakes.',
      author: {
        '@type': 'Person',
        name: 'Yaroslav Krupoder',
        url: 'https://yaroslav-k-v.github.io/'
      }
    }
  }
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

  if (meta.image) {
    result = result.replace(
      /<meta\s+[^>]*property=["']og:image["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
      `<meta property="og:image" content="${meta.image}" />`
    );
    result = result.replace(
      /<meta\s+[^>]*name=["']twitter:image["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
      `<meta name="twitter:image" content="${meta.image}" />`
    );
  }

  if (meta.schema) {
    const schemaScript = `\n    <script type="application/ld+json">\n      ${JSON.stringify(meta.schema, null, 2).replace(/\n/g, '\n      ')}\n    </script>`;
    result = result.replace(/<\/head>/i, `${schemaScript}\n  </head>`);
  }

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
