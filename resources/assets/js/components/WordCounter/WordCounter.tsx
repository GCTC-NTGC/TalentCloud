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
}

const WordCounter: React.FunctionComponent<WordCounterProps> = ({
  elementId,
  minWords,
  maxWords,
  wordLimit,
  warnings,
}): React.ReactElement => {
  const [currentNumberOfWords, setCurrentNumberOfWords] = useState(0);
  const [message, setMessage] = useState("");
  const [strokeColor, setStrokeColor] = useState("");

  const getNumberOfWords = (innerText: string): number => {
    // return innerText.split(" ").length - 1;
    return innerText
      .replace(/\s+/g, " ")
      .trim()
      .split(" ").length;
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

  const updateCurrentNumberOfWords = (numOfWords: number): void => {
    setCurrentNumberOfWords(numOfWords);
  };

  // This method calculates the total number of words (and the color of the progressRing) within the input element and updates the state on any input changes
  const getCurrentNumberOfWords = (element: HTMLTextAreaElement): void => {
    const prevNumOfChars = 0;
    element.addEventListener(
      "input",
      (e): void => {
        const target = e.target as HTMLTextAreaElement;
        // console.log(getNumberOfWords(target.value));
        setCurrentNumberOfWords(getNumberOfWords(target.value));
        // updateCurrentNumberOfWords(getNumberOfWords(target.value));

        const totalChars = target.value.length;

        console.log(currentNumberOfWords);

        // if (totalChars < prevNumOfChars && currentNumberOfWords < wordLimit) {
        //   target.maxLength = 1000000000;
        //   console.log("under");
        // } else if (
        //   totalChars > prevNumOfChars &&
        //   currentNumberOfWords > wordLimit
        // ) {
        //   console.log("over");
        //   target.maxLength = totalChars;
        //   prevNumOfChars = totalChars;
        // } else {
        //   // do nothing
        // }
      },
    );
  };

  const truncateWords = (value: string, wordLimit: number): void => {
    // if(currentNumberOfWords > wordLimit) {
    // }
  };

  /*
    useEffect() is a combination of componentDidMount, componentDidUpdate, and componentWillUnmount
  */
  useEffect((): void => {
    const element: HTMLTextAreaElement = document.getElementById(
      elementId,
    ) as HTMLTextAreaElement;
    updateColor();
    updateMessage();

    element.addEventListener(
      "input",
      (e): void => {
        const target = e.target as HTMLTextAreaElement;
        setCurrentNumberOfWords(getNumberOfWords(target.value));
        console.log(getNumberOfWords(target.value));

        if (currentNumberOfWords > wordLimit) {
          // target.value = truncateWords(target.value, wordLimit);
        }
      },
    );
  }, []);

  useEffect((): void => {
    const element: HTMLTextAreaElement = document.getElementById(
      elementId,
    ) as HTMLTextAreaElement;
    // console.log(currentNumberOfWords);

    const totalChars = element.value.length;

    if (currentNumberOfWords < wordLimit) {
      // After maxLength is set to positive number, it cannot be set back to unlimited (-1)
      element.maxLength = 1000000000;
    } else if (currentNumberOfWords > wordLimit) {
      // element.maxLength = totalChars;
    } else {
      // do nothing
    }
  }, [currentNumberOfWords]);

  return (
    <div
      className="word-counter"
      role="progressbar"
      aria-valuenow={currentNumberOfWords}
      aria-valuemin={minWords}
      aria-valuemax={maxWords}
    >
      <ProgressRing
        radius={30}
        stroke={6}
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
