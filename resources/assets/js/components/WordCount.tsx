import React from "react";
import ReactDOM from "react-dom";

interface WordCountProps {
  name: string;
}

interface WordCountState {
  isSaving: boolean;
}

class WordCount extends React.Component<WordCountProps, WordCountState> {
  public render(): React.ReactElement {
    const { name } = this.props;
    return <h1>Word Counter</h1>;
  }
}

if (document.getElementById("word-counter")) {
  const container = document.getElementById(
    "course-react-component"
  ) as HTMLElement;

  if (container.hasAttribute("data-name")) {
    const name = JSON.parse(container.getAttribute("data-name") as string);
    ReactDOM.render(<WordCount name={name} />, container);
  }
}

export default WordCount;
