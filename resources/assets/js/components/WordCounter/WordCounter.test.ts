import {
  countNumberOfWords,
  stringEndsInWhitespace,
  truncateWords,
  sortMessages,
} from "./helpers";

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

    it("Returns the truncated value (including spaces and newlines) if over word limit with whitespace character", (): void => {
      const value = "one two     thre \n four.      ";
      const expected = "one two     thre \n four. ";
      expect(truncateWords(value, 4)).toEqual(expected);
    });
    it("Returns the truncated value (including spaces and newlines) if over word limit by a single newline character", (): void => {
      const value = "one two     thre \n four.\n";
      const expected = "one two     thre \n four. ";
      expect(truncateWords(value, 4)).toEqual(expected);
    });
    it("Returns the truncated value (including spaces and newlines) if over word limit by multiple words", (): void => {
      const value = "one two     thre \n four five six seven";
      const expected = "one two     thre \n four ";
      expect(truncateWords(value, 4)).toEqual(expected);
    });
  });

  describe("Sort messages", (): void => {
    it("Sort messages in decending order", (): void => {
      const value = [
        { count: 10, message: "Seems short, try adding an example or two." },
        {
          count: 1,
          message:
            "This is too short, try including examples or lessons learned.",
        },
        { count: 20, message: "Looks good." },
        {
          count: 100,
          message: "This looks really long, try summarizing some text.",
        },
        { count: 80, message: "This is starting to get too long." },
        {
          count: 130,
          message:
            "This is way too long, try deleting irrelevant content, or see an example.",
        },
      ];
      const expected = [
        {
          count: 130,
          message:
            "This is way too long, try deleting irrelevant content, or see an example.",
        },
        {
          count: 100,
          message: "This looks really long, try summarizing some text.",
        },
        { count: 80, message: "This is starting to get too long." },
        { count: 20, message: "Looks good." },
        { count: 10, message: "Seems short, try adding an example or two." },
        {
          count: 1,
          message:
            "This is too short, try including examples or lessons learned.",
        },
      ];
      expect(sortMessages(value)).toEqual(expected);
    });
  });
});
