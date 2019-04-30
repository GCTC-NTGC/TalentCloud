import React from 'react';
import ReactDOM from 'react-dom';
import ProgressRing from '../ProgressRing';

interface WordCounterProps {
  elementId: string;
  maxWords: number;
  minWords: number;
}

interface WordCounterState {
  totalWords: number;
  strokeColor: string;
  message: string;
}

class WordCounter extends React.Component<WordCounterProps, WordCounterState> {
  public constructor(props: WordCounterProps) {
    super(props);
    const { elementId } = this.props;
    const element = document.getElementById(elementId) as HTMLInputElement;

    this.state = {
      totalWords: this.getNumberOfWords(element.value) || 0,
      strokeColor: '',
      message: '',
    };
    this.getTotalWords(elementId);
  }

  public componentDidMount() {
    const { elementId } = this.props;
    const element = document.getElementById(elementId) as HTMLInputElement;
    this.updateColor(this.getNumberOfWords(element.value));
  }

  // This method calculates the total number of words (and the color of the progressRing) within the input element and updates the state on any input changes
  protected getTotalWords(elementId: string): void {
    const element = document.getElementById(elementId) as HTMLInputElement;

    if (element !== null) {
      element.addEventListener('input', e => {
        const target = e.target as HTMLInputElement;
        const totalWords = this.getNumberOfWords(target.value) - 1;
        // update total words state
        this.updateTotalWords(totalWords);
        // update the color
        this.updateColor(totalWords);
      });
    }
  }

  // This method takes a string and returns the total number of words.
  protected getNumberOfWords(innerText: string): number {
    return innerText.replace(/[ ]{2,}/gi, ' ').split(' ').length;
  }

  // update the totalWord count
  protected updateTotalWords(totalWords: number): void {
    this.setState({ totalWords });
  }

  protected updateColor(totalWords: number): void {
    const { maxWords, minWords } = this.props;
    let hue = totalWords;
    let message = '';

    // Danger Zone
    if (totalWords > maxWords) {
      // Get difference and subtract from total words to gradualy move back to danger color
      const difference = totalWords - maxWords;
      hue = maxWords - difference;

      if (hue > 120) {
        hue = 120;
        message = 'Acceptable Answer';
      }

      if (hue < 0) {
        hue = 0;
        message = 'Too Long';
      }
    } else if (totalWords > minWords && totalWords < maxWords) {
      // the goldy lock zone, this will set the stroke to green
      hue = 120;
      message = 'Acceptable Answer';
    } else {
      hue = totalWords;
      message = 'Weak Answer';
    }

    // set the stroke color
    this.setState({
      strokeColor: `hsl(${hue}, 90%, 50%)`,
      message,
    });
  }

  public render(): React.ReactElement {
    const { totalWords, strokeColor, message } = this.state;
    const { maxWords, minWords } = this.props;
    return (
      <div
        className="word-counter"
        role="progressbar"
        aria-valuenow={totalWords}
        aria-valuemin={minWords}
        aria-valuemax={maxWords}
      >
        <ProgressRing
          radius={25}
          stroke={5}
          progress={totalWords}
          strokeColor={strokeColor}
          max={maxWords}
        />
        <span>{message}</span>
      </div>
    );
  }
}

// Find all skills textarea elements
if (document.querySelectorAll('div[data-word-counter-id]')) {
  const elements = document.querySelectorAll('div[data-word-counter-id]');

  Array.prototype.slice.call(elements).forEach(container => {
    if (container != null && container.hasAttribute('data-word-counter-id')) {
      const elementId = JSON.parse(container.getAttribute(
        'data-word-counter-id',
      ) as string);
      const maxWords = JSON.parse(container.getAttribute(
        'data-max-words',
      ) as string);
      const minWords = JSON.parse(container.getAttribute(
        'data-min-words',
      ) as string);
      ReactDOM.render(
        <WordCounter
          elementId={elementId}
          maxWords={maxWords}
          minWords={minWords}
        />,
        container,
      );
    }
  });
}

export default WordCounter;
