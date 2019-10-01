import { createBrowserHistory, Location } from "history";
import UniversalRouter, { Routes } from "universal-router";
import React, { useState, useEffect, useMemo } from "react";

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

export const useRouter = (
  routes: Routes<any, React.ReactElement>,
): React.ReactElement | null => {
  const location = useLocation();
  const router = useMemo(() => new UniversalRouter(routes), [routes]);
  const [component, setComponent] = useState<React.ReactElement | null>(null);

  // Render the result of routing
  useEffect((): void => {
    router
      .resolve(location.pathname)
      .then((result): void => setComponent(result));
  }, [location, router]);

  return component;
};

export const navigate = (url: string): void => {
  HISTORY.push(url);
};
