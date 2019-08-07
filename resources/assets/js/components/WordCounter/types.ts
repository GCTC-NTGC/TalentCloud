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
  /** Let's you specify example text that appears in textarea element when empty  */
  placeholder?: string;
  /** The hue of the progress ring. Corresponds to the current number of words */
  strokeColor: string;
}

export interface WordCounterMessage {
  /** When this number is reached, the correspoding message will be displayed */
  count: number;
  /** Message displayed when 'count' is reached */
  message: ReactIntl.FormattedMessage.MessageDescriptor | string;
}
