import React, { useState, useEffect } from "react";
import WordCounter, { WordCounterProps } from "./WordCounter";
import { countNumberOfWords, sortMessages } from "./helpers";

export interface WordCounterMessage {
  /** When this number is reached, the correspoding message will be displayed */
  count: number;
  /** Message displayed when 'count' is reached */
  message: string;
}

interface WordCounterWrapperProps
  extends Omit<WordCounterProps, "numOfWords" | "message" | "strokeColor"> {
  elementId: string;
  messages: WordCounterMessage[];
}

const WordCounterWrapper: React.FunctionComponent<WordCounterWrapperProps> = ({
  elementId,
  wordLimit,
  minWords,
  maxWords,
  messages,
  placeholder,
}): React.ReactElement => {
  const [currentNumberOfWords, setCurrentNumberOfWords] = useState(0);

  useEffect((): (() => void) => {
    const element: HTMLTextAreaElement = document.getElementById(
      elementId,
    ) as HTMLTextAreaElement;

    setCurrentNumberOfWords(countNumberOfWords(element.value));

    const handleInputChange = (e): void => {
      const target = e.target as HTMLTextAreaElement;
      const numOfWords = countNumberOfWords(target.value);
      setCurrentNumberOfWords(numOfWords);
    };

    element.addEventListener("input", handleInputChange);

    return function cleanup(): void {
      element.removeEventListener("input", handleInputChange, false);
    };
  }, [elementId, wordLimit]);

  const handleMessage = (): string => {
    let index = 0;
    const sortedMessages = sortMessages(messages);
    const message = sortedMessages.find(({ count }, i): boolean => {
      index = i;
      return currentNumberOfWords >= count;
    });

    return message ? message.message : sortedMessages[index].message;
  };

  const strokeColor = (): string => {
    const median = minWords + (maxWords - minWords) / 2;
    let hue = currentNumberOfWords;
    // the median between the minimum and maximum numbers
    const percentage = currentNumberOfWords / median;
    const difference = 120 * percentage - 120;

    /*
      https://mothereffinghsl.com/

      HSL - Hue, Saturation, Lightness

      Green: 120 hue
      Red: 0 hue
    */

    if (currentNumberOfWords <= minWords) {
      hue = 120 * percentage;
    } else if (
      currentNumberOfWords > minWords &&
      currentNumberOfWords <= maxWords
    ) {
      if (currentNumberOfWords <= median) {
        hue = 120 * percentage;
      } else {
        hue = 120 - difference;
      }
    } else if (currentNumberOfWords > maxWords) {
      hue = 120 - difference;

      if (hue <= 0) {
        hue = 0;
      }
    }

    return `hsl(${hue}, 80%, 50%)`;
  };

  return (
    <WordCounter
      numOfWords={currentNumberOfWords}
      wordLimit={wordLimit}
      maxWords={maxWords}
      minWords={minWords}
      message={handleMessage()}
      placeholder={placeholder}
      strokeColor={strokeColor()}
    />
  );
};

export default WordCounterWrapper;
