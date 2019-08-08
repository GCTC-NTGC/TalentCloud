import React, { useState } from "react";
import { copyElementContents } from "../helpers/clipboard";

interface CopyToClipboardProps {
  reference: React.RefObject<any>;
}

const CopyToClipboard: React.FunctionComponent<CopyToClipboardProps> = ({
  reference,
}): React.ReactElement => {
  const [hidden, hideText] = useState(false);

  return (
    <button
      type="button"
      data-c-button="solid(c1)"
      data-c-radius="rounded"
      onClick={(): void => {
        copyElementContents(reference.current);
        hideText(!hidden);
        setTimeout((): void => {
          hideText(hidden);
        }, 1000);
      }}
    >
      <span className={`default ${hidden && "hidden"}`}>Copy to Clipboard</span>
      <span className={`copied ${!hidden && "hidden"}`}>Copied!</span>
    </button>
  );
};

export default CopyToClipboard;
