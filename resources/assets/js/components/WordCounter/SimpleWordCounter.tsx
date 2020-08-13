import React from "react";
import { countNumberOfWords } from "./helpers";

export interface SimpleWordCounterProps {
  /** Maximum amount of words before passing the optimal range. The Progress Ring color correlates with this number. */
  wordLimit: number;
  /** The text who's words are being counted. */
  value: string;
  /** String before current number of words */
  beforeText?: string;
  /** String after counter when user is under the max */
  underMaxMessage?: string;
  /** String after counter when user is over the max */
  overMaxMessage?: string;
  /** Keep absolute value of max words - number of words */
  absoluteValue?: boolean;
}

const SimpleWordCounter: React.FunctionComponent<SimpleWordCounterProps> = ({
  wordLimit,
  value,
  beforeText,
  underMaxMessage,
  overMaxMessage,
  absoluteValue,
}): React.ReactElement => {
  const minWords = 0;
  const numOfWords = countNumberOfWords(value);
  return (
    <span
      role="progressbar"
      aria-valuenow={numOfWords}
      aria-valuemin={minWords}
      aria-valuemax={wordLimit}
    >
      {beforeText && <span>{beforeText} </span>}
      <span data-c-color={`${numOfWords <= wordLimit ? "go" : "stop"}`}>
        {absoluteValue
          ? Math.abs(wordLimit - numOfWords)
          : wordLimit - numOfWords}
      </span>
      <span> {numOfWords <= wordLimit ? underMaxMessage : overMaxMessage}</span>
    </span>
  );
};

export default SimpleWordCounter;
