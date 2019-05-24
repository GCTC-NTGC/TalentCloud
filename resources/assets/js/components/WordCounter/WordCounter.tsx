import React from 'react';
import ReactDOM from 'react-dom';
import ProgressRing from '../ProgressRing';

type Message = {
  max: number,
  message: string;
}

interface WordCounterProps {
  elementId: string;
  maxWords: number;
  minWords: number;
  warnings: Message[];
  wordLimit: number;
}

interface WordCounterState {
  currentNumberOfWords: number;
  median: number;
  strokeColor: string;
  message: string;
}

class WordCounter extends React.Component<WordCounterProps, WordCounterState> {
  public constructor(props: WordCounterProps) {
    super(props);
    // const { elementId } = this.props;
    // const element = document.getElementById(elementId) as HTMLInputElement;

    const { minWords, maxWords } = this.props;

    this.state = {
      currentNumberOfWords: 0,
      median: minWords + ((maxWords - minWords) / 2),
      strokeColor: '',
      message: ''
    };
  }

  public componentDidMount() {
    const { elementId } = this.props;
    const element = document.getElementById(elementId) as HTMLInputElement;
    this.updateColor(this.getNumberOfWords(element.value));
    this.updateMessage(this.getNumberOfWords(element.value));
    this.updateCurrentNumberOfWords(this.getNumberOfWords(element.value));
    this.getCurrentNumberOfWords();
  }

  // This method calculates the total number of words (and the color of the progressRing) within the input element and updates the state on any input changes
  protected getCurrentNumberOfWords(): void {
    const { elementId } = this.props;
    const element = document.getElementById(elementId) as HTMLInputElement;
    const { wordLimit } = this.props;
    let previousNumOfChars = 0;

    if (element !== null) {
      element.addEventListener('input', e => {
        const target = e.target as HTMLInputElement;
        const currentNumberOfWords = this.getNumberOfWords(target.value);
        const totalChars = target.value.length;
        // update total words state
        this.updateCurrentNumberOfWords(currentNumberOfWords);
        // update the color
        this.updateColor(currentNumberOfWords);
        // update message
        this.updateMessage(currentNumberOfWords);

        // set hard cap
        if( previousNumOfChars > totalChars && currentNumberOfWords < wordLimit) {
          // how can you set textarea to unlimited?
          console.log(previousNumOfChars);
          console.log(totalChars);
          target.maxLength = 10000000;
        } else {
          if(currentNumberOfWords >= wordLimit) {

            target.maxLength = totalChars;

            previousNumOfChars = totalChars;
          }
        }
      });
    }
  }

  // This method takes a string and returns the total number of words.
  protected getNumberOfWords(innerText: string): number {
    return innerText.replace(/[ ]{2,}/gi, ' ').split(' ').length - 1;
  }

  // update the totalWord count
  protected updateCurrentNumberOfWords(currentNumberOfWords: number): void {
    this.setState({ currentNumberOfWords });
  }

  protected updateColor(currentNumberOfWords: number): void {
    const { maxWords, minWords } = this.props;
    const { median } = this.state;
    let hue = currentNumberOfWords;
    // the median between the minimum and maximum numbers
    const percentage = currentNumberOfWords / median;
    const difference = (120 * percentage) - 120;

    /*
      https://mothereffinghsl.com/

      HSL - Hue, Saturation, Lightness

      Green: 120 hue
      Red: 0 hue
    */


    if(currentNumberOfWords <= minWords) {
      hue = 120 * percentage;

    } else if (currentNumberOfWords > minWords && currentNumberOfWords <= maxWords) {

        if(currentNumberOfWords <= median) {
          hue = 120 * percentage;
        } else {
          hue = 120 - difference;
        }

    } else if(currentNumberOfWords > maxWords) {
        hue = 120 - difference;

        if(hue <= 0) {
          hue = 0;
        }
    }

    // set the stroke color
    this.setState({
      strokeColor: `hsl(${hue}, 80%, 50%)`,
    });
  }

  // updates the message
  protected updateMessage = (currentNumberOfWords: number) => {
    const { warnings } = this.props;
    let index: number = 0;
    const warning = warnings.find(({max}, i) => {
      index = i;
      return warnings[i+1] && currentNumberOfWords >= max && currentNumberOfWords < warnings[i+1].max;
    });

    this.setState({ message: warning ? warning.message : warnings[index].message })
  }

  public render(): React.ReactElement {
    const { currentNumberOfWords, strokeColor, message, median } = this.state;
    const { maxWords, minWords } = this.props;
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
        <span>{currentNumberOfWords} {message}</span>
      </div>
    );
  }
}

// Find all skills textarea elements
if (document.querySelectorAll('div[data-word-counter-id]')) {
  const elements = document.querySelectorAll('div[data-word-counter-id]');

  const warnings = [
    { max: 0, message: 'This is too short, try including examples or lessons learned.'},
    { max: 10, message: 'Seems short, try adding an example or two.'},
    { max: 20, message: 'Looks good.'},
    { max: 80, message: 'This is starting to get too long.'},
    { max: 100, message: 'This looks really long, try summarizing some text.'},
    { max: 130, message: 'This is way too long, try deleting irrelevant content, or see an example.'},
  ];

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
          maxWords={+maxWords}
          minWords={+minWords}
          warnings={warnings}
          wordLimit={60}
        />,
        container,
      );
    }
  });
}

export default WordCounter;
