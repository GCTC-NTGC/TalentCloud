import { WordCounterMessage } from "./WordCounterWrapper";

export const countNumberOfWords = (innerText: string): number => {
  if (innerText.trim()) {
    return innerText
      .replace(/\s+/g, " ")
      .trim()
      .split(" ").length;
  }
  return 0;
};

export const stringEndsInWhitespace = (value: string): boolean => {
  const pattern = /.*\s$/; // \s represents any whitespace characters, like tabs, spaces and newlines
  return pattern.test(value);
};

export const truncateWords = (value: string, wordLimit: number): string => {
  const wordCount = countNumberOfWords(value);

  if (wordCount === wordLimit && stringEndsInWhitespace(value)) {
    return `${value.trim()} `;
  }

  if (wordCount > wordLimit) {
    // This pattern finds the first n words, where words are characters divided by whitespace, and n=wordLimit
    const pattern = new RegExp(`([^\\s]+\\s+){${wordLimit}}`, "g");
    const matches = pattern.exec(value);
    if (matches) {
      return `${matches[0].trim()} `;
    }
  }
  return value;
};

/** Sorts messages in decending order */
export const sortMessages = (
  messages: WordCounterMessage[],
): WordCounterMessage[] => {
  const sortedMessages = messages.sort((a, b): number => b.count - a.count);

  return sortedMessages;
};
