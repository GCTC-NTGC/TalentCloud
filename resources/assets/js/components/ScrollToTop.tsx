import React, { useEffect } from "react";

interface ScrollToTopProps {
  /** The top position of element relative to the viewport.  */
  offsetTop?: number;
  /** Set the scroll behavior to 'auto'. Default = 'smooth' */
  scrollBehaviorAuto?: boolean;
}

const ScrollToTop: React.FunctionComponent<ScrollToTopProps> = ({
  offsetTop,
  scrollBehaviorAuto,
  children,
}): React.ReactElement => {
  useEffect(() => {
    const body: HTMLElement | null = document.querySelector("html");
    // switch to auto scroll transition
    body && scrollBehaviorAuto ? body.style.scrollBehavior = "auto" : null

    window.scrollTo(0, 0);
    if (offsetTop) {
      window.scrollTo(0, offsetTop);
    }

    // switch back to smooth scrool transition
    body && scrollBehaviorAuto ? body.style.scrollBehavior = 'smooth' : null
  }, [children, offsetTop]);
  return <>{children}</>;
};

export default ScrollToTop;
