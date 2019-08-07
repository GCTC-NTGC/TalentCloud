import React, { useState, useEffect } from "react";
import WordCounter from "./WordCounter";
import { countNumberOfWords, truncateWords, toggleSpaceBar } from "./helpers";
import { WordCounterProps, WordCounterMessage } from "./types";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  FormattedHTMLMessage,
  defineMessages,
} from "react-intl";
import IntlContainer from "../../IntlContainer";
import { sortMessages } from "./helpers";
import { string } from "yup";

interface WordCounterWrapperProps
  extends Omit<WordCounterProps, "numOfWords" | "message" | "strokeColor"> {
  elementId: string;
  messages: WordCounterMessage[];
}

const WordCounterWrapper: React.FunctionComponent<
  WordCounterWrapperProps & InjectedIntlProps
> = ({
  elementId,
  wordLimit,
  minWords,
  maxWords,
  messages,
  placeholder,
  intl,
}): React.ReactElement => {
  const [currentNumberOfWords, setCurrentNumberOfWords] = useState(0);

  const handleMessage = (): string => {
    let index = 0;
    const sortedMessages = sortMessages(messages);
    const message = sortedMessages.find(({ count }, i): boolean => {
      index = i;
      return currentNumberOfWords >= count;
    });

    if (message) {
      if (typeof message.message === "string") {
        return message.message;
      } else {
        return (
          intl.formatMessage(
            message.message as ReactIntl.FormattedMessage.MessageDescriptor,
          )
        );
      }
    } else {
      return intl.formatMessage(messages[index]
            .message as ReactIntl.FormattedMessage.MessageDescriptor)
    }
  };

  const strokeColor = (): string => {
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

    return `hsl(${hue}, 80%, 50%)`;
  };

  useEffect((): void => {
    const element: HTMLTextAreaElement = document.getElementById(
      elementId,
    ) as HTMLTextAreaElement;

    setCurrentNumberOfWords(countNumberOfWords(element.value));

    element.addEventListener("input", (e): void => {
      toggleSpaceBar(true);
      const target = e.target as HTMLTextAreaElement;
      const numOfWords = countNumberOfWords(target.value);
      setCurrentNumberOfWords(numOfWords);

      const caretPosition = target.selectionStart;

      if (numOfWords >= wordLimit) {
        toggleSpaceBar(false);
        target.value = truncateWords(target.value, wordLimit);
      }

      target.setSelectionRange(caretPosition, caretPosition);
    });
  }, [elementId, wordLimit]);

  return (
    <WordCounter
      numOfWords={currentNumberOfWords}
      wordLimit={wordLimit}
      maxWords={maxWords}
      minWords={minWords}
      message={handleMessage()}
      placeholder={placeholder}
      strokeColor={strokeColor()}
    />
  );
};

export default injectIntl(WordCounterWrapper);
