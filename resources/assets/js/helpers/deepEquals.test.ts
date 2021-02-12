import dayjs from "dayjs";
import { fakeExperienceAward } from "../fakeData/fakeExperience";
import { fromInputDateString, readableDateTime } from "./dates";
import deepEquals from "./deepEquals";

describe("deepEquals", (): void => {
  it("Empty arrays, objects, and strings are equal", (): void => {
    expect(deepEquals([], [])).toEqual(true);
    expect(deepEquals({}, {})).toEqual(true);
    expect(deepEquals("", "")).toEqual(true);
  });
  it("works on simple arrays", (): void => {
    const a = [1, 2, "three", false];
    const b = [1, 2, "three", false];
    const c = [1, 2, "four", false];
    const d = [1, 2, false, "three"];
    expect(deepEquals(a, b)).toEqual(true);
    expect(deepEquals(a, c)).toEqual(false);
    expect(deepEquals(a, d)).toEqual(false);
  });
  it("works on nested arrays", (): void => {
    const a = [1, 2, "three", [4, 5]];
    const b = [1, 2, "three", [4, 5]];
    const c = [1, 2, "three", [5, 4]];
    expect(deepEquals(a, b)).toEqual(true);
    expect(deepEquals(a, c)).toEqual(false);
  });
  it("works on simple objects", (): void => {
    const a = { id: 1, name: "Talent Cloud" };
    const b = { name: "Talent Cloud", id: 1 }; // Order shouldn't matter for object attributes
    const c = { id: 1, name: "Talent Cloud", extra: true };
    expect(deepEquals(a, b)).toEqual(true);
    expect(deepEquals(a, c)).toEqual(false);
  });
  it("works on dates", (): void => {
    const a = fromInputDateString("2020-04-20");
    const b = fromInputDateString("2020-04-20");
    const c = fromInputDateString("2020-04-21");
    expect(deepEquals(a, b)).toEqual(true);
    expect(deepEquals(a, c)).toEqual(false);
  });
  it("works on experience objects", (): void => {
    const a = fakeExperienceAward();
    const b = fakeExperienceAward();
    const c = fakeExperienceAward({ title: "Title has changed" });
    expect(deepEquals(a, b)).toEqual(true);
    expect(deepEquals(a, c)).toEqual(false);
  });
});
