import React from "react";
import ProgressRing from "../ProgressRing";
import { WordCounterProps } from "./types";
import { sortMessages } from "./helpers";

const WordCounter: React.FunctionComponent<WordCounterProps> = ({
  numOfWords,
  minWords,
  maxWords,
  messages,
  placeholder,
}): React.ReactElement => {
  const handleMessage = (): string => {
    let index = 0;
    const sortedMessages = sortMessages(messages);
    const message = sortedMessages.find(({ count }, i): boolean => {
      index = i;
      return numOfWords >= count;
    });

    return message ? message.message : messages[index].message;
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
        {numOfWords === 0 ? placeholder : handleMessage()}
      </span>
    </div>
  );
};

export default WordCounter;
