import { describe, it, expect } from "vitest";
import { translations, Locale } from "../i18n/translations";
import { WORKFLOW_PHASES } from "../components/ContextRingArtifact";

describe("Workflow & Context Ring Data Integrity", () => {
  const locales: Locale[] = ["en", "ua", "bg"];

  it("contains complete workflow translations for all supported locales", () => {
    locales.forEach((loc) => {
      const t = translations[loc];
      expect(t.workflow).toBeDefined();
      expect(typeof t.workflow.badge).toBe("string");
      expect(typeof t.workflow.title).toBe("string");
      expect(typeof t.workflow.subtitle).toBe("string");
      expect(typeof t.workflow.auto).toBe("string");
      expect(typeof t.workflow.pause).toBe("string");
      expect(typeof t.workflow.prevStep).toBe("string");
      expect(typeof t.workflow.nextStep).toBe("string");
      expect(typeof t.workflow.stagePrefix).toBe("string");
      expect(typeof t.workflow.myRule).toBe("string");
      expect(typeof t.workflow.inPractice).toBe("string");
      expect(typeof t.workflow.chipHint).toBe("string");
    });
  });

  it("guarantees exactly 4 workflow steps per locale with non-empty fields", () => {
    locales.forEach((loc) => {
      const steps = translations[loc].workflow.steps;
      expect(Array.isArray(steps)).toBe(true);
      expect(steps).toHaveLength(4);

      steps.forEach((step, idx) => {
        expect(step.number).toBe(`0${idx + 1}`);
        expect(step.tag.trim().length).toBeGreaterThan(0);
        expect(step.shortTitle.trim().length).toBeGreaterThan(0);
        expect(step.title.trim().length).toBeGreaterThan(0);
        expect(step.lead.trim().length).toBeGreaterThan(0);
        expect(step.humanTakeaway.trim().length).toBeGreaterThan(0);
        expect(step.projectExample.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies Ukrainian linguistic precision for step 04 audit", () => {
    const uaSteps = translations.ua.workflow.steps;
    expect(uaSteps[3].shortTitle).toBe("ПОСТРІЧКОВИЙ АУДИТ");
    expect(uaSteps[3].title).toContain("Пострічковий");
  });

  it("validates Context Ring telemetry and exactly 10 localized chips", () => {
    locales.forEach((loc) => {
      const ring = translations[loc].workflow.ring;
      expect(ring).toBeDefined();
      expect(ring.center).toHaveLength(4);
      expect(ring.meta).toHaveLength(4);
      expect(ring.chips).toHaveLength(10);
      expect(typeof ring.chipAriaPrefix).toBe("string");

      ring.meta.forEach((m) => {
        expect(m.headL.trim().length).toBeGreaterThan(0);
        expect(m.headR.trim().length).toBeGreaterThan(0);
        expect(m.footL.trim().length).toBeGreaterThan(0);
        expect(m.footR.trim().length).toBeGreaterThan(0);
      });

      ring.chips.forEach((chip) => {
        expect(chip.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies WORKFLOW_PHASES configuration in ContextRingArtifact", () => {
    expect(WORKFLOW_PHASES).toHaveLength(10);

    const phaseIds = new Set<string>();
    WORKFLOW_PHASES.forEach((phase) => {
      expect(phaseIds.has(phase.id)).toBe(false);
      phaseIds.add(phase.id);

      expect(phase.stepIndex).toBeGreaterThanOrEqual(0);
      expect(phase.stepIndex).toBeLessThanOrEqual(3);
      expect(phase.fallbackLabel.trim().length).toBeGreaterThan(0);
    });
  });
});
