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
        radius={30}
        stroke={6}
        progress={numOfWords}
        strokeColor={strokeColor}
        max={minWords}
      />
      <span style={numOfWords === 0 ? { color: "#80808085" } : {}}>
        {numOfWords === 0 && placeholder
          ? placeholder
          : numOfWords > 0 && message}
      </span>
    </div>
  );
};

export default WordCounter;
