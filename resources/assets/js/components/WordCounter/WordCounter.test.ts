import {
  countNumberOfWords,
  stringEndsInWhitespace,
  truncateWords,
} from "./WordCounter";

describe("WordCounter component", (): void => {
  describe("countNumberOfWords", (): void => {
    it("returns 3 when given three words ending in a period", (): void => {
      const value = "one two three.";
      expect(countNumberOfWords(value)).toEqual(3);
    });
    it("returns 3 when given three words with leading whitespace ending in a period", (): void => {
      const value = "    one two three.";
      expect(countNumberOfWords(value)).toEqual(3);
    });
    it("returns 3 when given three words followed by whitespace", (): void => {
      const value = "    one two three. ";
      expect(countNumberOfWords(value)).toEqual(3);
    });
  });

  describe("stringEndsInWhitespace", (): void => {
    it("returns false for string ending in period", (): void => {
      expect(stringEndsInWhitespace("hello world.")).toEqual(false);
    });
    it("returns true for string ending in space", (): void => {
      expect(stringEndsInWhitespace("hello world.   ")).toEqual(true);
    });
    it("returns true for string ending in newline", (): void => {
      expect(stringEndsInWhitespace("hello world.\n")).toEqual(true);
    });
  });

  describe("truncateWords", (): void => {
    it("Returns exact value (including spaces and newlines) if under word limit", (): void => {
      const value = "one two     thre \n four   ";
      expect(truncateWords(value, 10)).toEqual(value);
    });
    it("Returns exact value (including trailing whitespace) if under word limit", (): void => {
      const value = "one two     thre \n ";
      expect(truncateWords(value, 4)).toEqual(value);
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
