import React, { useState } from "react";
import { copyToClipboard } from "../helpers/clipboard";
import { FormattedMessage } from "react-intl";

interface CopyToClipboardProps {
  actionText: string | React.ReactElement;
  postActionText: string | React.ReactElement;
  textToCopy: string;
}

const CopyToClipboard: React.FunctionComponent<CopyToClipboardProps> = ({
  actionText,
  postActionText,
  textToCopy,
}): React.ReactElement => {
  const [hidden, hideText] = useState(false);
  return (
    <button
      type="button"
      data-c-button="solid(c1)"
      data-c-radius="rounded"
      onClick={(event): void => {
        copyToClipboard(event, textToCopy).then(() => {
          hideText(!hidden);
          setTimeout((): void => {
            hideText(hidden);
          }, 2000);
        });
      }}
    >
      <span className={`default ${hidden && "hidden"}`}>{actionText}</span>
      <span className={`copied ${!hidden && "hidden"}`}>{postActionText}</span>
    </button>
  );
};

export default CopyToClipboard;
