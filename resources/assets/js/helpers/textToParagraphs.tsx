import React from "react";

/**
 * Splits a string on newlines and creates a list of <p> elements with the results.
 * @param text A string that may or may not contain newlines.
 * @param props An object with attributes to add to each <p> element.
 * @returns One or more <p> elements wrapped in a fragment.
 */
export const textToParagraphs = (
  text: string,
  props?: any,
): React.ReactFragment => {
  const items = text.split("\n");
  return (
    <>
      {items.map(
        (item, index): React.ReactElement => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index} {...props}>
            {item.trim().length > 0 ? item : <br />}
          </p>
        ),
      )}
    </>
  );
};

export default textToParagraphs;
