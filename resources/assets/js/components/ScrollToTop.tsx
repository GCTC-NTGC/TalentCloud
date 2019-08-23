import React, { useEffect } from "react";

interface ScrollToTopProps {
  /** The top position of element relative to the viewport.  */
  top?: number;
}

const ScrollToTop: React.FunctionComponent<ScrollToTopProps> = ({
  top,
  children,
}): React.ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (top) {
      window.scrollBy(0, top);
    }
  }, [children, top]);
  return <>{children}</>;
};

export default ScrollToTop;
