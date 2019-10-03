import { createBrowserHistory, Location } from "history";
import UniversalRouter, { Routes } from "universal-router";
import React, { useState, useEffect, useMemo, FunctionComponent } from "react";
import { useIntl } from "react-intl";
import { scrollToTopWrapper } from "../components/ScrollToTop";

const HISTORY = createBrowserHistory();

// Current implementation adapted from https://codesandbox.io/s/vyx8q7jvk7

export const useLocation = (): Location<any> => {
  const history = HISTORY;
  const [location, setLocation] = useState(history.location);
  useEffect((): (() => void) => {
    const unListen = history.listen((newLocation): void =>
      setLocation(newLocation),
    );
    return (): void => unListen();
  }, [history]);
  return location;
};

// Scroll to element specified in the url hash, if possible
export const useUrlHash = (): void => {
  const location = useLocation();
  const [hashFound, setHashFound] = useState(false);
  useEffect((): void => {
    if (location.hash && !hashFound) {
      const hash = location.hash.startsWith("#")
        ? location.hash.substring(1)
        : location.hash;
      const element = document.getElementById(hash);
      if (element) {
        setHashFound(true);
        window.scrollTo(0, element.offsetTop);
      }
    }
  }, [location.hash, hashFound]);
};

export const UseRouter: FunctionComponent<{
  routes: Routes<any, any>;
  scrollToTop?: boolean;
}> = ({ routes, scrollToTop }): React.ReactElement | null => {
  const intl = useIntl();
  const location = useLocation();
  const router = useMemo(() => new UniversalRouter(routes), [routes]);
  const [component, setComponent] = useState<React.ReactElement | null>(null);
  const tracker: HTMLElement | null = document.getElementById(
    "job-builder-root",
  );
  const trackerOffsetTop: number = tracker ? tracker.offsetTop : 0;

  // Render the result of routing
  useEffect((): void => {
    router.resolve(location.pathname).then((result): void => {
      const title = intl.formatMessage(result.title);
      const h1 = document.querySelector("h1");
      document.title = title;
      if (h1) h1.innerHTML = title;
      setComponent(result.component);
    });
  }, [intl, location, router]);

  return scrollToTop
    ? scrollToTopWrapper(component, trackerOffsetTop, true)
    : component;
};

export const navigate = (url: string): void => {
  HISTORY.push(url);
};
