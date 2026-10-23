import { describe, it, expect } from 'vitest';
import { projects } from '../data/projects';

describe('Projects data collection', () => {
  it('exports projects array containing exactly 5 projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects).toHaveLength(5);
  });

  it('ensures each project has valid required metadata fields', () => {
    projects.forEach((project) => {
      expect(typeof project.id).toBe('number');
      expect(project.id).toBeGreaterThan(0);

      expect(typeof project.slug).toBe('string');
      expect(project.slug.trim().length).toBeGreaterThan(0);

      expect(typeof project.title).toBe('string');
      expect(project.title.trim().length).toBeGreaterThan(0);

      expect(typeof project.description).toBe('string');
      expect(project.description.trim().length).toBeGreaterThan(0);

      expect(Array.isArray(project.tech)).toBe(true);
      expect(project.tech.length).toBeGreaterThan(0);
      project.tech.forEach((techItem) => {
        expect(typeof techItem).toBe('string');
        expect(techItem.trim().length).toBeGreaterThan(0);
      });

      expect(Array.isArray(project.categories)).toBe(true);
      expect(project.categories.length).toBeGreaterThan(0);

      expect(Array.isArray(project.features)).toBe(true);
      expect(project.features.length).toBeGreaterThan(0);
      project.features.forEach((feature) => {
        expect(typeof feature).toBe('string');
        expect(feature.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('ensures all slugs are unique and conform to kebab-case alphanumeric format', () => {
    const slugRegex = /^[a-z0-9-]+$/;
    const slugs = projects.map((p) => p.slug);

    slugs.forEach((slug) => {
      expect(slug).toMatch(slugRegex);
    });

    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(projects.length);
  });

  it('ensures every project has a complete dossier with all mandatory sections', () => {
    projects.forEach((project) => {
      expect(project.dossier).toBeDefined();
      const dossier = project.dossier!;

      expect(typeof dossier.problemStatement).toBe('string');
      expect(dossier.problemStatement.trim().length).toBeGreaterThan(0);

      expect(Array.isArray(dossier.scopeObjectives)).toBe(true);
      expect(dossier.scopeObjectives.length).toBeGreaterThan(0);
      dossier.scopeObjectives.forEach((obj) => {
        expect(typeof obj).toBe('string');
        expect(obj.trim().length).toBeGreaterThan(0);
      });

      expect(Array.isArray(dossier.keyDecisions)).toBe(true);
      expect(dossier.keyDecisions.length).toBeGreaterThan(0);
      dossier.keyDecisions.forEach((kd) => {
        expect(typeof kd.title).toBe('string');
        expect(typeof kd.reasoning).toBe('string');
        expect(kd.title.trim().length).toBeGreaterThan(0);
        expect(kd.reasoning.trim().length).toBeGreaterThan(0);
      });

      expect(Array.isArray(dossier.stackMatrix)).toBe(true);
      expect(dossier.stackMatrix.length).toBeGreaterThan(0);
      dossier.stackMatrix.forEach((sm) => {
        expect(typeof sm.category).toBe('string');
        expect(Array.isArray(sm.items)).toBe(true);
        expect(sm.items.length).toBeGreaterThan(0);
      });

      expect(Array.isArray(dossier.metrics)).toBe(true);
      expect(dossier.metrics.length).toBeGreaterThan(0);
      dossier.metrics.forEach((metric) => {
        expect(typeof metric.label).toBe('string');
        expect(typeof metric.value).toBe('string');
        expect(metric.label.trim().length).toBeGreaterThan(0);
        expect(metric.value.trim().length).toBeGreaterThan(0);
      });

      expect(Array.isArray(dossier.architectureLayers)).toBe(true);
      expect(dossier.architectureLayers.length).toBeGreaterThan(0);
      dossier.architectureLayers.forEach((layer) => {
        expect(typeof layer.name).toBe('string');
        expect(typeof layer.detail).toBe('string');
        expect(layer.name.trim().length).toBeGreaterThan(0);
        expect(layer.detail.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
