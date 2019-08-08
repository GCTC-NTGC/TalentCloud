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
