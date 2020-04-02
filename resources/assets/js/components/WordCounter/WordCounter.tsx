import React, { useState, useEffect } from "react";
import { countNumberOfWords } from "./helpers";

export interface WordCounterProps {
  /** Id of textarea element */
  elementId: string;
  /** Maximum amount of words before passing the optimal range. The Progress Ring color correlates with this number. */
  maxWords: number;
  /** Minimum amount of words to reach the optimal range. The Progress Ring color correlates with this number. */
  minWords: number;
}

const WordCounter: React.FunctionComponent<WordCounterProps> = ({
  elementId,
  minWords,
  maxWords,
}): React.ReactElement => {
  const [numOfWords, setNumOfWords] = useState(0);

  useEffect((): (() => void) => {
    const element: HTMLTextAreaElement = document.getElementById(
      elementId,
    ) as HTMLTextAreaElement;

    setNumOfWords(countNumberOfWords(element.value));

    const handleInputChange = (e: Event): void => {
      const target = e.target as HTMLTextAreaElement;
      setNumOfWords(countNumberOfWords(target.value));
    };

    element.addEventListener("input", handleInputChange);

    return function cleanup(): void {
      element.removeEventListener("input", handleInputChange, false);
    };
  }, [elementId]);

  return (
    <span
      role="progressbar"
      aria-valuenow={numOfWords}
      aria-valuemin={minWords}
      aria-valuemax={maxWords}
    >
      {maxWords - numOfWords}
    </span>
  );
};

export default WordCounter;
