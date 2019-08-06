import React, { useState, useEffect } from "react";
import WordCounter from "./WordCounter";
import { countNumberOfWords, truncateWords } from "./helpers";
import { WordCounterProps } from "./types";

interface WordCounterWrapperProps extends Omit<WordCounterProps, "numOfWords"> {
  elementId: string;
}

const WordCounterWrapper: React.FunctionComponent<WordCounterWrapperProps> = ({
  elementId,
  wordLimit,
  minWords,
  maxWords,
  messages,
  placeholder,
}): React.ReactElement => {
  // const [currentNumberOfWords, setCurrentNumberOfWords] = useState(0);

  useEffect((): void => {
    const element: HTMLTextAreaElement = document.getElementById(
      elementId,
    ) as HTMLTextAreaElement;

    // setCurrentNumberOfWords(countNumberOfWords(element.value));

    element.addEventListener("input", (e): void => {
      const target = e.target as HTMLTextAreaElement;
      const numOfWords = countNumberOfWords(target.value);
      console.log(numOfWords);
      // setCurrentNumberOfWords(numOfWords);

      if (numOfWords >= wordLimit) {
        target.value = truncateWords(target.value, wordLimit);
      }
    });
  }, [elementId, wordLimit]);

  return (
    <>
      <WordCounter
        numOfWords={0}
        wordLimit={wordLimit}
        maxWords={maxWords}
        minWords={minWords}
        messages={messages}
        placeholder={placeholder}
      />
    </>
  );
};

export default WordCounterWrapper;
