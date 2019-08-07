import React from "react";
import ProgressRing from "../ProgressRing";
import { WordCounterProps } from "./types";

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
      <ProgressRing
        radius={50}
        stroke={8}
        progress={numOfWords}
        strokeColor={strokeColor}
        max={minWords}
      />
      <div style={numOfWords === 0 ? { color: "#80808085" } : {}}>
        <span className="word-counter__progress">{`${numOfWords} / ${wordLimit}`}</span>
        <span className="word-counter__message">
          {numOfWords === 0 && placeholder
            ? placeholder
            : numOfWords > 0 && message}
        </span>
      </div>
    </div>
  );
};

export default WordCounter;
