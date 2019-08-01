import React, { useState, useEffect } from "react";
import WordCounter from "./WordCounter";
import { countNumberOfWords, truncateWords } from "./helpers";

interface Message {
  max: number;
  message: string;
}

interface WordCounterWrapperProps {
  elementId: string;
  maxWords: number;
  minWords: number;
  wordLimit: number;
  warnings: Message[];
}

const WordCounterWrapper: React.FunctionComponent<WordCounterWrapperProps> = ({
  elementId,
  wordLimit,
  minWords,
  maxWords,
  warnings,
}): React.ReactElement => {
  const [currentNumberOfWords, setCurrentNumberOfWords] = useState(0);

  useEffect((): void => {
    const element: HTMLTextAreaElement = document.getElementById(
      elementId,
    ) as HTMLTextAreaElement;

    element.addEventListener("input", (e): void => {
      const target = e.target as HTMLTextAreaElement;
      const numOfWords = countNumberOfWords(target.value);

      if (target.value.trim()) {
        setCurrentNumberOfWords(numOfWords);
      } else {
        setCurrentNumberOfWords(0);
      }

      if (numOfWords < wordLimit) {
        // After maxLength is set to positive number, it cannot be set back to unlimited (-1)
        element.maxLength = 1000000000;
      } else if (numOfWords >= wordLimit) {
        target.value = truncateWords(target.value, wordLimit);
      } else {
        // do nothing
      }
    });
  }, [elementId, wordLimit]);

  return (
    <>
      <WordCounter
        numOfWords={currentNumberOfWords}
        wordLimit={wordLimit}
        maxWords={maxWords}
        minWords={minWords}
        warnings={warnings}
      />
    </>
  );
};

export default WordCounterWrapper;
