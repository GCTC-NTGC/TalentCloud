import { createBrowserHistory, Location, History } from "history";
import UniversalRouter, { Routes } from "universal-router";
import React, { useState, useEffect, useMemo } from "react";

const HISTORY = createBrowserHistory();

// Current implementation adapted from https://codesandbox.io/s/vyx8q7jvk7

export const useLocation = (history: History<any>): Location<any> => {
  const [location, setLocation] = useState(history.location);
  useEffect((): (() => void) => {
    const unListen = history.listen((newLocation): void =>
      setLocation(newLocation),
    );
    return (): void => unListen();
  }, [history]);
  return location;
};

export const useRouter = (
  routes: Routes<any, React.ReactElement>,
): React.ReactElement | null => {
  const history = HISTORY;
  const location = useLocation(history);
  const router = useMemo(() => new UniversalRouter(routes), [routes]);
  const [component, setComponent] = useState<React.ReactElement | null>(null);

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
