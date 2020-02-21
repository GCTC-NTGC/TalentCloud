import React, { useEffect, useState } from "react";

interface ScrollToTopProps {
  /** The top position of element relative to the viewport.  */
  offsetTop?: number;
  /** Set the scroll behavior to 'auto'. Default = 'smooth' */
  scrollBehaviorAuto?: boolean;
  children: React.ReactElement | null;
}

const ScrollToTop: React.FunctionComponent<ScrollToTopProps> = ({
  offsetTop,
  scrollBehaviorAuto,
  children,
}): React.ReactElement => {
  const [prevPathname, setPrevPathName] = useState(window.location.pathname);

  const setScrollBehaviour = (scrollBehavior): void => {
    const body: HTMLElement | null = document.querySelector("html");
    if (body) {
      body.style.scrollBehavior = scrollBehavior;
    }
  };
  useEffect(() => {
    if (prevPathname !== window.location.pathname) {
      // switch to auto scroll transition
      if (scrollBehaviorAuto) setScrollBehaviour("auto");

      if (offsetTop) {
        window.scrollTo(0, offsetTop);
      } else {
        window.scrollTo(0, 0);
      }

      // switch back to smooth scrool transition
      setScrollBehaviour("smooth");
    }

    setPrevPathName(window.location.pathname);
  }, [prevPathname, scrollBehaviorAuto, children, offsetTop]);
  return <>{children}</>;
};

export default ScrollToTop;
