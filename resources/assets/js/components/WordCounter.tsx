import React from "react";
import ReactDOM from "react-dom";
import ProgressRing from "./ProgressRing";

interface WordCounterProps {
  elementId: string;
}

interface WordCounterState {
  totalWords: number;
  strokeColor: string;
}

class WordCounter extends React.Component<WordCounterProps, WordCounterState> {
  public constructor(props: WordCounterProps) {
    super(props);
    const { elementId } = this.props;
    const element = document.getElementById(elementId) as HTMLInputElement;

    this.state = {
      totalWords: this.getNumberOfWords(element.value) || 0,
      strokeColor: ""
    };
    this.getTotalWords(elementId);
  }

  componentDidMount() {
    const { elementId } = this.props;
    const element = document.getElementById(elementId) as HTMLInputElement;
    this.updateColor(this.getNumberOfWords(element.value));
  }

  // This method calculates the total number of words within
  protected getTotalWords(elementId: string): void {
    const element = document.getElementById(elementId) as HTMLInputElement;

    if (element !== null) {
      element.addEventListener("input", e => {
        const target = e.target as HTMLInputElement;
        const totalWords = this.getNumberOfWords(target.value);
        this.updateTotalWords(totalWords);
        this.updateColor(totalWords);
      });
    }
  }

  // This method takes a string and returns the total number of words.
  protected getNumberOfWords(innerText: string): number {
    return innerText.replace(/[ ]{2,}/gi, " ").split(" ").length;
  }

  protected updateTotalWords(totalWords: number): void {
    // update the totalWord count
    this.setState({ totalWords });
  }

  protected updateColor(totalWords: number): void {
    let hue = totalWords;

    // Danger Zone
    if (totalWords > 200) {
      hue = 0;
      // Goldy lock zone
    } else if (totalWords > 100 && totalWords < 150) {
      hue = 118;
    } else {
      // nothing
    }

    this.setState({
      strokeColor: "hsl(" + hue + ", 100%, 50%)"
    });
  }

  public render(): React.ReactElement {
    const { totalWords, strokeColor } = this.state;
    return (
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={totalWords - 1}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <ProgressRing
          radius={25}
          stroke={5}
          progress={totalWords - 1}
          strokeColor={strokeColor}
        />
      </div>
    );
  }
}

// Find all skill form textarea elements
if (document.querySelectorAll("div[data-id]")) {
  const list = document.querySelectorAll("div[data-id]");

  list.forEach(function(container) {
    if (container != null && container.hasAttribute("data-id")) {
      const elementId = JSON.parse(container.getAttribute("data-id") as string);
      ReactDOM.render(<WordCounter elementId={elementId} />, container);
    }
  });
}

export default WordCounter;
