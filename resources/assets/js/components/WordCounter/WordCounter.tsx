import React, { useState, useEffect } from "react";
import { countNumberOfWords } from "./helpers";

export interface WordCounterProps {
  /** Id of textarea element */
  elementId: string;
  /** Maximum amount of words before passing the optimal range. The Progress Ring color correlates with this number. */
  maxWords: number;
  /** Minimum amount of words to reach the optimal range. The Progress Ring color correlates with this number. */
  minWords: number;
  /** Keep absolute value of max words - number of words */
  absoluteValue?: boolean;
  /** String before current number of words */
  beforeText?: string;
  /** String after counter when user is under the max */
  underMaxMessage?: string;
  /** String after counter when user is over the max */
  overMaxMessage?: string;
  /** List of clone data style attributes */
  dataAttributes?: { [key: string]: string };
}

const WordCounter: React.FunctionComponent<WordCounterProps> = ({
  elementId,
  minWords,
  maxWords,
  absoluteValue,
  beforeText,
  underMaxMessage,
  overMaxMessage,
  dataAttributes,
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
      {...dataAttributes}
    >
      {beforeText && <span>{beforeText} </span>}
      <span data-c-color={`${numOfWords <= maxWords ? "go" : "stop"}`}>
        {absoluteValue
          ? Math.abs(maxWords - numOfWords)
          : maxWords - numOfWords}
      </span>
      <span> {numOfWords <= maxWords ? underMaxMessage : overMaxMessage}</span>
    </span>
  );
};

export default WordCounter;
