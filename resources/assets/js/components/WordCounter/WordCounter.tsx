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
  elementId: string;
  maxWords: number;
  minWords: number;
  warnings: Message[];
  wordLimit: number;
  numberOfWords: number;
}

const WordCounter: React.FunctionComponent<WordCounterProps> = ({
  elementId,
  numberOfWords,
  minWords,
  maxWords,
  wordLimit,
  warnings,
}): React.ReactElement => {
  const [currentNumberOfWords, setCurrentNumberOfWords] = useState(
    numberOfWords,
  );
  const [message, setMessage] = useState("");
  const [strokeColor, setStrokeColor] = useState("");

  const getNumberOfWords = (innerText: string): number => {
    return innerText.replace(/[ ]{2,}/gi, " ").split(" ").length - 1;
  };

  // updates the message
  const updateMessage = (): void => {
    let index = 0;
    const warning = warnings.find(
      ({ max }, i): boolean => {
        index = i;
        return (
          warnings[i + 1] &&
          currentNumberOfWords >= max &&
          currentNumberOfWords < warnings[i + 1].max
        );
      },
    );

    // set the message
    setMessage(warning ? warning.message : warnings[index].message);
  };

  const updateColor = (): void => {
    const median = minWords + (maxWords - minWords) / 2;
    let hue = currentNumberOfWords;
    // the median between the minimum and maximum numbers
    const percentage = currentNumberOfWords / median;
    const difference = 120 * percentage - 120;

    /*
      https://mothereffinghsl.com/

      HSL - Hue, Saturation, Lightness

      Green: 120 hue
      Red: 0 hue
    */

    if (currentNumberOfWords <= minWords) {
      hue = 120 * percentage;
    } else if (
      currentNumberOfWords > minWords &&
      currentNumberOfWords <= maxWords
    ) {
      if (currentNumberOfWords <= median) {
        hue = 120 * percentage;
      } else {
        hue = 120 - difference;
      }
    } else if (currentNumberOfWords > maxWords) {
      hue = 120 - difference;

      if (hue <= 0) {
        hue = 0;
      }
    }

    // set the stroke color
    setStrokeColor(`hsl(${hue}, 80%, 50%)`);
  };

  // This method calculates the total number of words (and the color of the progressRing) within the input element and updates the state on any input changes
  const getCurrentNumberOfWords = (element: HTMLTextAreaElement): void => {
    let previousNumOfChars = 0;

    if (element !== null) {
      element.addEventListener(
        "input",
        (e): void => {
          const target = e.target as HTMLTextAreaElement;
          setCurrentNumberOfWords(getNumberOfWords(target.value));
          const totalChars = target.value.length;
          // update total words state
          this.updateCurrentNumberOfWords(currentNumberOfWords);
          // update the color
          updateColor();
          // update message
          updateMessage();

          // set hard cap
          if (
            previousNumOfChars > totalChars &&
            currentNumberOfWords < wordLimit
          ) {
            // how can you set textarea to unlimited?
            target.maxLength = 10000000;
          } else if (currentNumberOfWords >= wordLimit) {
            target.maxLength = totalChars;

            previousNumOfChars = totalChars;
          }
        },
      );
    }
  };

  /*
    useEffect() is a combination of componentDidMount, componentDidUpdate, and componentWillUnmount
  */
  useEffect(
    (): void => {
      const element: HTMLTextAreaElement = document.getElementById(
        elementId,
      ) as HTMLTextAreaElement;
      setCurrentNumberOfWords(getNumberOfWords(element.value));
      updateColor();
      updateMessage();
      getCurrentNumberOfWords(element);
    },
  );

  return (
    <div
      className="word-counter"
      role="progressbar"
      aria-valuenow={currentNumberOfWords}
      aria-valuemin={minWords}
      aria-valuemax={maxWords}
    >
      <ProgressRing
        radius={25}
        stroke={5}
        progress={currentNumberOfWords}
        strokeColor={strokeColor}
        max={minWords}
      />
      <span style={currentNumberOfWords === 0 ? { color: "#80808085" } : {}}>
        {message}
      </span>
    </div>
  );
};

export default WordCounter;
