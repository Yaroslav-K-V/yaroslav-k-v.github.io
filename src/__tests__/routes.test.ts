import { describe, it, expect } from 'vitest';
import {
  VALID_ROUTES,
  isValidRoute,
  parseQueryParams,
  parseRoute,
  parseProjectSlug,
  parseFilter,
  parseLocation,
  getProjectBySlug,
} from '../utils/routes';

describe('Route Validation & Parsing Engine', () => {
  describe('isValidRoute', () => {
    it('validates standard application routes', () => {
      VALID_ROUTES.forEach((route) => {
        expect(isValidRoute(route)).toBe(true);
      });
    });

    it('rejects invalid or unknown route names', () => {
      expect(isValidRoute('dashboard')).toBe(false);
      expect(isValidRoute('home')).toBe(false);
      expect(isValidRoute('settings')).toBe(false);
      expect(isValidRoute('')).toBe(false);
      expect(isValidRoute(null)).toBe(false);
      expect(isValidRoute(undefined)).toBe(false);
      expect(isValidRoute(123)).toBe(false);
    });
  });

  describe('parseQueryParams', () => {
    it('parses empty or missing search query strings', () => {
      expect(parseQueryParams('')).toEqual({});
      expect(parseQueryParams('?')).toEqual({});
    });

    it('parses single and multiple query parameters', () => {
      expect(parseQueryParams('?p=/about')).toEqual({ p: '/about' });
      expect(parseQueryParams('?filter=ai')).toEqual({ filter: 'ai' });
      expect(parseQueryParams('?project=unitra')).toEqual({ project: 'unitra' });
      expect(parseQueryParams('?filter=ai&project=unitra')).toEqual({
        filter: 'ai',
        project: 'unitra',
      });
    });
  });

  describe('Pathname Route Resolution', () => {
    it('resolves root and welcome paths to "welcome"', () => {
      expect(parseRoute('/')).toBe('welcome');
      expect(parseRoute('')).toBe('welcome');
      expect(parseRoute('/welcome')).toBe('welcome');
      expect(parseRoute('/welcome/')).toBe('welcome');
    });

    it('resolves about paths to "about"', () => {
      expect(parseRoute('/about')).toBe('about');
      expect(parseRoute('/about/')).toBe('about');
      expect(parseRoute({ pathname: '/about' })).toBe('about');
    });

    it('resolves projects paths to "projects"', () => {
      expect(parseRoute('/projects')).toBe('projects');
      expect(parseRoute('/projects/')).toBe('projects');
      expect(parseRoute({ pathname: '/projects' })).toBe('projects');
    });

    it('resolves contacts paths to "contacts"', () => {
      expect(parseRoute('/contacts')).toBe('contacts');
      expect(parseRoute('/contacts/')).toBe('contacts');
      expect(parseRoute({ pathname: '/contacts' })).toBe('contacts');
    });

    it('falls back to "welcome" for unknown pathnames', () => {
      expect(parseRoute('/unknown')).toBe('welcome');
      expect(parseRoute('/foo/bar')).toBe('welcome');
    });
  });

  describe('Search Query Parameter Handling', () => {
    it('resolves redirect query parameter ?p= correctly', () => {
      expect(parseRoute('/?p=/about')).toBe('about');
      expect(parseRoute('/?p=about')).toBe('about');
      expect(parseRoute('/?p=/projects')).toBe('projects');
      expect(parseRoute('/?p=/contacts')).toBe('contacts');
      expect(parseRoute('/?p=/welcome')).toBe('welcome');
    });

    it('resolves ?filter= parameter to projects route', () => {
      expect(parseRoute('/?filter=ai')).toBe('projects');
      expect(parseRoute('/projects?filter=ai')).toBe('projects');
      expect(parseFilter('/?filter=ai')).toBe('ai');
    });

    it('resolves ?project= parameter to projects route and extracts slug', () => {
      expect(parseRoute('/?project=unitra')).toBe('projects');
      expect(parseRoute('/projects?project=unitra')).toBe('projects');
      expect(parseProjectSlug('/?project=unitra')).toBe('unitra');
      expect(parseProjectSlug('/projects?project=unitra')).toBe('unitra');
    });

    it('handles ?p=slug redirecting directly to a known project', () => {
      expect(parseRoute('/?p=unitra')).toBe('projects');
      expect(parseProjectSlug('/?p=unitra')).toBe('unitra');
      expect(parseRoute('/?p=/unitra/')).toBe('projects');
      expect(parseProjectSlug('/?p=/unitra/')).toBe('unitra');
    });

    it('preserves non-root page route when filter query is attached', () => {
      expect(parseRoute('/about?filter=ai')).toBe('about');
      expect(parseRoute('/contacts?project=unitra')).toBe('contacts');
    });
  });

  describe('Hash Route Resolution', () => {
    it('resolves standard hash routes correctly', () => {
      expect(parseRoute('#/about')).toBe('about');
      expect(parseRoute('#about')).toBe('about');
      expect(parseRoute('#/projects')).toBe('projects');
      expect(parseRoute('#projects')).toBe('projects');
      expect(parseRoute('#/contacts')).toBe('contacts');
      expect(parseRoute('#contacts')).toBe('contacts');
      expect(parseRoute('#/welcome')).toBe('welcome');
    });

    it('resolves project slug hashes to projects route and extracts slug', () => {
      expect(parseRoute('#/unitra')).toBe('projects');
      expect(parseProjectSlug('#/unitra')).toBe('unitra');
      expect(parseRoute('#unitra')).toBe('projects');
      expect(parseProjectSlug('#unitra')).toBe('unitra');
    });

    it('falls back to pathname when hash is empty or invalid', () => {
      expect(parseRoute('/about#')).toBe('about');
      expect(parseRoute('/#unknown-section')).toBe('welcome');
    });
  });

  describe('Precedence & Complex Locations', () => {
    it('prioritizes redirect parameter ?p= over underlying pathname', () => {
      expect(parseRoute('/contacts?p=/about')).toBe('about');
    });

    it('prioritizes valid hash route over root pathname', () => {
      expect(parseRoute('/#about')).toBe('about');
      expect(parseRoute('/#/projects')).toBe('projects');
    });

    it('correctly aggregates location state via parseLocation', () => {
      const state = parseLocation('/projects?filter=ai&project=unitra');
      expect(state.route).toBe('projects');
      expect(state.filter).toBe('ai');
      expect(state.projectSlug).toBe('unitra');
      expect(state.params).toEqual({
        filter: 'ai',
        project: 'unitra',
      });
    });

    it('extracts project entity by slug with case insensitivity', () => {
      const unitra = getProjectBySlug('unitra');
      expect(unitra).toBeDefined();
      expect(unitra?.title).toBe('Unitra');
      expect(unitra?.id).toBe(2);

      const unitraUpper = getProjectBySlug('UNITRA');
      expect(unitraUpper).toBeDefined();
      expect(unitraUpper?.id).toBe(2);

      const unknown = getProjectBySlug('nonexistent');
      expect(unknown).toBeUndefined();
    });
  });
});
