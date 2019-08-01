import React, { useState, useEffect } from "react";
import ProgressRing from "../ProgressRing";

/*
  Question: Should this component have the option to add a textarea component (or input element)?
  example:
    prop: textAreaComponent: React.ReactElement
    ...
    return (
      {textAreaComponent && textAreaComponent}
    )
*/

interface Message {
  max: number;
  message: string;
}

interface WordCounterProps {
  numOfWords: number;
  maxWords: number;
  minWords: number;
  warnings: Message[];
  wordLimit: number;
}

const WordCounter: React.FunctionComponent<WordCounterProps> = ({
  numOfWords,
  minWords,
  maxWords,
  warnings,
}): React.ReactElement => {
  const message = (): string => {
    let index = 0;
    const warning = warnings.find(({ max }, i): boolean => {
      index = i;
      return (
        warnings[i + 1] && numOfWords >= max && numOfWords < warnings[i + 1].max
      );
    });

    return warning ? warning.message : warnings[index].message;
  };

  const strokeColor = (): string => {
    const median = minWords + (maxWords - minWords) / 2;
    let hue = numOfWords;
    // the median between the minimum and maximum numbers
    const percentage = numOfWords / median;
    const difference = 120 * percentage - 120;

    /*
      https://mothereffinghsl.com/

      HSL - Hue, Saturation, Lightness

      Green: 120 hue
      Red: 0 hue
    */

    if (numOfWords <= minWords) {
      hue = 120 * percentage;
    } else if (numOfWords > minWords && numOfWords <= maxWords) {
      if (numOfWords <= median) {
        hue = 120 * percentage;
      } else {
        hue = 120 - difference;
      }
    } else if (numOfWords > maxWords) {
      hue = 120 - difference;

      if (hue <= 0) {
        hue = 0;
      }
    }

    return `hsl(${hue}, 80%, 50%)`;
  };

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
        strokeColor={strokeColor()}
        max={minWords}
      />
      <span style={numOfWords === 0 ? { color: "#80808085" } : {}}>
        {message()} Total: {numOfWords}
      </span>
    </div>
  );
};

export default WordCounter;
