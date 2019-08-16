import React, { Fragment } from "react";

export const nl2br = (text: string): React.ReactFragment => {
  const items = text.split("\n");
  return (
    <>
      {items.map(
        (item, index): React.ReactFragment => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {item}
            <br />
          </Fragment>
        ),
      )}
    </>
  );
};

export default nl2br;
