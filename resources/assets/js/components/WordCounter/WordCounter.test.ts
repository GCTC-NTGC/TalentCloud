import { truncateWords } from "./WordCounter";

describe("WordCounter component", (): void => {
  describe("truncateWords", (): void => {
    it("Returns exact value (including spaces and newlines) if under word limit", (): void => {
      const value = "one two     thre \n four   ";
      expect(truncateWords(value, 10)).toEqual(value);
    });

    it("Returns the truncated value (including spaces and newlines) if over word limit by a single whitespace character", (): void => {
      const value = "one two     thre \n four. ";
      const expected = "one two     thre \n four.";
      expect(truncateWords(value, 4)).toEqual(expected);
    });
    it("Returns the truncated value (including spaces and newlines) if over word limit by a single newline character", (): void => {
      const value = "one two     thre \n four.\n";
      const expected = "one two     thre \n four.";
      expect(truncateWords(value, 4)).toEqual(expected);
    });
    it("Returns the truncated value (including spaces and newlines) if over word limit by multiple words", (): void => {
      const value = "one two     thre \n four five six seven";
      const expected = "one two     thre \n four";
      expect(truncateWords(value, 4)).toEqual(expected);
    });
  });
});
