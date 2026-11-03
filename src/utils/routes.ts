import { PageRoute, Project } from "../types";
import { projects } from "../data/projects";

export const VALID_ROUTES: readonly PageRoute[] = [
  "welcome",
  "about",
  "projects",
  "contacts",
] as const;

export interface LocationInput {
  pathname?: string;
  search?: string;
  hash?: string;
}

export interface ParsedRouteState {
  route: PageRoute;
  projectSlug: string | null;
  filter: string | null;
  params: Record<string, string>;
}

export function isValidRoute(route: unknown): route is PageRoute {
  return (
    typeof route === "string" &&
    (VALID_ROUTES as readonly string[]).includes(route)
  );
}

export function parseQueryParams(search: string = ""): Record<string, string> {
  const query = search.startsWith("?") ? search.slice(1) : search;
  if (!query) return {};
  const params = new URLSearchParams(query);
  const result: Record<string, string> = {};
  params.forEach((val, key) => {
    result[key] = val;
  });
  return result;
}

function normalizeInput(input: string | LocationInput): {
  pathname: string;
  search: string;
  hash: string;
} {
  if (typeof input === "string") {
    try {
      const url = new URL(input, "http://localhost");
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      };
    } catch {
      const hashIndex = input.indexOf("#");
      const hash = hashIndex !== -1 ? input.slice(hashIndex) : "";
      const withoutHash = hashIndex !== -1 ? input.slice(0, hashIndex) : input;
      const queryIndex = withoutHash.indexOf("?");
      const search = queryIndex !== -1 ? withoutHash.slice(queryIndex) : "";
      const pathname =
        queryIndex !== -1 ? withoutHash.slice(0, queryIndex) : withoutHash;
      return { pathname, search, hash };
    }
  }

  return {
    pathname: input.pathname || "",
    search: input.search || "",
    hash: input.hash || "",
  };
}

export function parseProjectSlug(input: string | LocationInput): string | null {
  const { pathname, search, hash } = normalizeInput(input);
  const params = parseQueryParams(search);

  if (params["project"]) {
    return params["project"];
  }

  const p = params["p"];
  if (p) {
    const cleanedP = p.replace(/^\//, "").replace(/\/$/, "").toLowerCase();
    const slugCandidate = cleanedP.startsWith("projects/")
      ? cleanedP.slice("projects/".length)
      : cleanedP;
    const matched = projects.find(
      (proj) => proj.slug.toLowerCase() === slugCandidate,
    );
    if (matched) {
      return matched.slug;
    }
  }

  if (hash) {
    const cleanedHash = hash
      .replace(/^#\/?/, "")
      .replace(/\/$/, "")
      .toLowerCase();
    if (projects.some((proj) => proj.slug.toLowerCase() === cleanedHash)) {
      return cleanedHash;
    }
  }

  // Check direct pathname: /projects/<slug> or /projects/<slug>/
  const segments = pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
  if (segments[0] === "projects" && segments[1]) {
    const candidate = segments[1].toLowerCase();
    if (projects.some((proj) => proj.slug.toLowerCase() === candidate)) {
      return candidate;
    }
  }

  return null;
}

export function parseFilter(input: string | LocationInput): string | null {
  const { search } = normalizeInput(input);
  const params = parseQueryParams(search);
  return params["filter"] || null;
}

export function parseRoute(input: string | LocationInput): PageRoute {
  const { pathname, search, hash } = normalizeInput(input);
  const params = parseQueryParams(search);

  // 1. Check query parameter redirect first (e.g. from 404.html redirect /?p=/about or /?p=about)
  const p = params["p"];
  if (p) {
    const cleaned = p.replace(/^\//, "").replace(/\/$/, "");
    if (isValidRoute(cleaned)) {
      return cleaned;
    }
    const slugCandidate = cleaned.toLowerCase().startsWith("projects/")
      ? cleaned.slice("projects/".length)
      : cleaned;
    // If ?p=unitra or ?p=/projects/unitra where slug matches one of our projects
    if (
      projects.some(
        (proj) => proj.slug.toLowerCase() === slugCandidate.toLowerCase(),
      )
    ) {
      return "projects";
    }
  }

  // 2. Query param ?project=slug or ?filter=category implies projects view unless path is another route
  const projectParam = params["project"];
  const filterParam = params["filter"];
  const cleanedPath = pathname.replace(/^\//, "").replace(/\/$/, "");

  if (projectParam || filterParam) {
    if (
      !cleanedPath ||
      cleanedPath === "welcome" ||
      cleanedPath === "projects"
    ) {
      return "projects";
    }
  }

  // 3. Check hash fallback (e.g. #/about, #about)
  if (hash) {
    const hashRoute = hash.replace(/^#\/?/, "").replace(/\/$/, "");
    if (isValidRoute(hashRoute)) {
      return hashRoute;
    }
    if (
      projects.some(
        (proj) => proj.slug.toLowerCase() === hashRoute.toLowerCase(),
      )
    ) {
      return "projects";
    }
  }

  // 4. Check pathname
  if (cleanedPath.startsWith("about")) return "about";
  if (cleanedPath.startsWith("projects")) return "projects";
  if (cleanedPath.startsWith("contacts")) return "contacts";
  if (cleanedPath.startsWith("welcome")) return "welcome";

  return "welcome";
}

export function parseLocation(input: string | LocationInput): ParsedRouteState {
  const normalized = normalizeInput(input);
  const route = parseRoute(normalized);
  const projectSlug = parseProjectSlug(normalized);
  const filter = parseFilter(normalized);
  const params = parseQueryParams(normalized.search);

  return {
    route,
    projectSlug,
    filter,
    params,
  };
}

export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}
