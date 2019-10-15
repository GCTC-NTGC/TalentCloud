import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { copyToClipboard } from "../helpers/clipboard";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FunctionComponent<CopyToClipboardProps> = ({
  text,
}): React.ReactElement => {
  const [hidden, hideText] = useState(false);
  return (
    <button
      type="button"
      data-c-button="solid(c1)"
      data-c-radius="rounded"
      onClick={(): void => {
        copyToClipboard(text);
        hideText(!hidden);
        setTimeout((): void => {
          hideText(hidden);
        }, 1000);
      }}
    >
      <span className={`default ${hidden && "hidden"}`}>
        <FormattedMessage
          id="jobBuilder.clipboardButton.copy"
          defaultMessage="Copy to Clipboard"
          description="Label for Copy to Clipboard button on Work Environment page."
        />
      </span>
      <span className={`copied ${!hidden && "hidden"}`}>
        <FormattedMessage
          id="jobBuilder.clipboardButton.copied"
          defaultMessage="Copied!"
          description="Label for Copy to Clipboard success confirmation on Work Environment page."
        />
      </span>
    </button>
  );
};

export default CopyToClipboard;
