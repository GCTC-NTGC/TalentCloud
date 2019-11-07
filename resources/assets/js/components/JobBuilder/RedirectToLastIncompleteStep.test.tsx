import { JobBuilderPage } from "./jobBuilderHelpers";
import {
  firstIncompletePage,
  PageStates,
} from "./RedirectToLastIncompleteStep";

describe("RedirectToLastIncompleteStep", (): void => {
  const pageOrder: JobBuilderPage[] = [
    "intro",
    "details",
    "env",
    "impact",
    "tasks",
    "skills",
    "review",
  ];
  describe("firstIncompletePage()", (): void => {
    test("should return null if first page is incomplete", (): void => {
      const pageStates: PageStates = {
        intro: () => "null",
        details: () => "error",
        env: () => "error",
        impact: () => "error",
        tasks: () => "error",
        skills: () => "error",
        review: () => "error",
      };
      expect(firstIncompletePage(pageStates, pageOrder)).toBeNull();
    });
    test("should return first page if first page is incomplete", (): void => {
      const pageStates: PageStates = {
        intro: () => "error",
        details: () => "error",
        env: () => "error",
        impact: () => "error",
        tasks: () => "error",
        skills: () => "error",
        review: () => "error",
      };
      expect(firstIncompletePage(pageStates, pageOrder)).toEqual("intro");
    });
    test("should return third page if first two are complete, third is incomplete", (): void => {
      const pageStates: PageStates = {
        intro: () => "complete",
        details: () => "complete",
        env: () => "error",
        impact: () => "null",
        tasks: () => "null",
        skills: () => "null",
        review: () => "null",
      };
      expect(firstIncompletePage(pageStates, pageOrder)).toEqual("env");
    });
    test("should return null if first pages are complete, next page is still loading", (): void => {
      const pageStates: PageStates = {
        intro: () => "complete",
        details: () => "complete",
        env: () => "null",
        impact: () => "error",
        tasks: () => "error",
        skills: () => "error",
        review: () => "error",
      };
      expect(firstIncompletePage(pageStates, pageOrder)).toBeNull();
    });
    test("should return null if all pages are complete (?)", (): void => {
      const pageStates: PageStates = {
        intro: () => "complete",
        details: () => "complete",
        env: () => "complete",
        impact: () => "complete",
        tasks: () => "complete",
        skills: () => "complete",
        review: () => "complete",
      };
      expect(firstIncompletePage(pageStates, pageOrder)).toBeNull();
    });
  });
});
