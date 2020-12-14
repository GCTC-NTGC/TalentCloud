import { createBrowserHistory, Location } from "history";
import UniversalRouter, { Routes } from "universal-router";
import React, { useState, useEffect, useMemo, ReactElement } from "react";
import { IntlShape, MessageDescriptor } from "react-intl";
import { removeBaseUrl } from "./routes";

const HISTORY = createBrowserHistory();

// Current implementation adapted from https://codesandbox.io/s/vyx8q7jvk7

export const useLocation = (): Location<any> => {
  const history = HISTORY;
  const [location, setLocation] = useState(history.location);
  useEffect((): (() => void) => {
    const unListen = history.listen(({ location: newLocation }): void =>
      setLocation(newLocation),
    );
    return (): void => unListen();
  }, [history]);
  return location;
};

// Scroll to element specified in the url hash, if possible
export const useUrlHash = (): string => {
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
  return location.hash;
};

export const navigate = (url: string): void => {
  // The history object has been initialized with the app's base url, so ensure it's not also part of the specified url.
  const path = removeBaseUrl(url);
  HISTORY.push(path);
};

export const redirect = (url: string): void => {
  // The history object has been initialized with the app's base url, so ensure it's not also part of the specified url.
  const path = removeBaseUrl(url);
  HISTORY.replace(path);
};

export interface RouterResult {
  title: MessageDescriptor;
  component: ReactElement;
  redirect?: string;
}

export const useRouter = (
  routes: Routes<any, RouterResult>,
  intl: IntlShape,
): React.ReactElement | null => {
  const location = useLocation();
  const router = useMemo(() => new UniversalRouter(routes), [routes]);
  const [component, setComponent] = useState<React.ReactElement | null>(null);
  const path = location.pathname;
  // Render the result of routing
  useEffect((): void => {
    router.resolve(path).then((result): void => {
      if (result.redirect) {
        redirect(result.redirect);
      } else {
        // Dynamically update the page title and header on step changes
        const title = intl.formatMessage(result.title);
        document.title = title;
        const h1 = document.querySelector("h1");
        if (h1) h1.innerHTML = title;
        setComponent(result.component);
      }
    });
  }, [intl, location, router]);

  return component;
};

export const Link: React.FC<{ href: string; title: string }> = ({
  href,
  title,
  children,
  ...props
}): React.ReactElement => (
  <a
    href={href}
    title={title}
    {...props}
    onClick={(event): void => {
      event.preventDefault();
      navigate(href);
    }}
  >
    {children}
  </a>
);
