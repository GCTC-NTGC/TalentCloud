import React from "react";
import ProgressRing from "../ProgressRing";

export interface WordCounterProps {
  /** The current number of words in textarea element */
  numOfWords: number;
  /** Maximum amount of words before passing the optimal range. The Progress Ring color correlates with this number. */
  maxWords: number;
  /** Minimum amount of words to reach the optimal range. The Progress Ring color correlates with this number. */
  minWords: number;
  /** Message to be displayed next to Progress Ring. When a word count is reached it informs the user with a corresponding message. */
  message: string;
  /** Hard cap on word counter. The user cannot add any more words after reaching this number. */
  wordLimit: number;
  /** Let's you specify example text that appears in word counter element when empty  */
  placeholder?: string;
  /** The hue of the progress ring. Corresponds to the current number of words */
  strokeColor: string;
}

const WordCounter: React.FunctionComponent<WordCounterProps> = ({
  numOfWords,
  minWords,
  maxWords,
  message,
  placeholder,
  strokeColor,
  wordLimit,
}): React.ReactElement => {
  return (
    <div
      className="word-counter"
      role="progressbar"
      aria-valuenow={numOfWords}
      aria-valuemin={minWords}
      aria-valuemax={maxWords}
    >
      <div>
        <ProgressRing
          radius={15}
          stroke={3}
          progress={numOfWords}
          strokeColor={strokeColor}
          max={minWords}
        />
      </div>
      <span className="word-counter__progress">{`(${numOfWords} / ${wordLimit})`}</span>
      <span
        className="word-counter__message"
        style={numOfWords === 0 ? { color: "grey" } : {}}
      >
        {numOfWords === 0 && placeholder
          ? placeholder
          : numOfWords > 0 && message}
      </span>
    </div>
  );
};

export default WordCounter;
