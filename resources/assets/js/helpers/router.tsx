import { createBrowserHistory, Location } from "history";
import UniversalRouter, { Routes } from "universal-router";
import React, { useState, useEffect, useMemo, ReactElement } from "react";
import { IntlShape, MessageDescriptor } from "react-intl";
import { useStore, useSelector } from "react-redux";
import { getSelectedJob } from "../store/Job/jobSelector";
import { localizeField, getLocale } from "./localize";
import { managerJobSummary } from "./routes";
import { RootState } from "../store/store";
import { Job } from "../models/types";
import { messages } from "../components/HRPortal/JobIndexHrPage";

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

export interface RouterResult {
  title: MessageDescriptor;
  component: ReactElement;
}
export const useRouter = (
  routes: Routes<any, RouterResult>,
  intl: IntlShape,
): React.ReactElement | null => {
  const locale = getLocale(intl.locale);
  const location = useLocation();
  const router = useMemo(() => new UniversalRouter(routes), [routes]);
  const [component, setComponent] = useState<React.ReactElement | null>(null);
  const job = useSelector((state: RootState) => getSelectedJob(state));

  const jobBreadcrumbId = "job-title-breadcrumb";
  const addJobBreadcrumb = (jobBreadcrumb: Job | null): void => {
    const breadcrumbs: HTMLOListElement | null = document.querySelector(
      "#jpb-breadcrumbs",
    );
    const breadcrumb: HTMLLIElement = document.createElement("li");
    const anchor = document.createElement("a");
    const icon = document.createElement("i");

    if (jobBreadcrumb) {
      anchor.id = jobBreadcrumbId;
      anchor.href = managerJobSummary(locale, jobBreadcrumb.id);
      anchor.innerText =
        localizeField(locale, jobBreadcrumb, "title") ||
        `{ ${intl.formatMessage(messages.titleMissing)} }`;
    } else {
      anchor.id = jobBreadcrumbId;
      anchor.innerText = intl.formatMessage(messages.loadingManager);
    }

    icon.classList.add("fas", "fa-caret-right");
    breadcrumb.append(anchor);
    breadcrumb.append(icon);

    if (breadcrumbs) {
      const lastBreadcrumb = breadcrumbs.lastElementChild;
      breadcrumbs.insertBefore(breadcrumb, lastBreadcrumb);
    }
  };

  // Render the result of routing
  useEffect((): void => {
    router.resolve(location.pathname).then((result): void => {
      // Dynamically update the page title and header on step changes
      const title = intl.formatMessage(result.title);
      document.title = title;
      const h1 = document.querySelector("h1");
      if (h1) h1.innerHTML = title;

      // Dynamically update the breadcrumbs on step changes
      const jobBreadcrumb: HTMLAnchorElement | null = document.querySelector(
        `#${jobBreadcrumbId}`,
      );
      if (job && jobBreadcrumb) {
        jobBreadcrumb.href = managerJobSummary(locale, job.id);
        jobBreadcrumb.innerText =
          localizeField(locale, job, "title") ||
          `{ ${intl.formatMessage(messages.titleMissing)} }`;
      } else if (job) {
        addJobBreadcrumb(job);
      } else {
        addJobBreadcrumb(null);
      }

      setComponent(result.component);
    });
  }, [intl, location, router, job]);

  return component;
};

export const navigate = (url: string): void => {
  HISTORY.push(url);
};

export const redirect = (url: string): void => {
  HISTORY.replace(url);
};

export const Link: React.FC<{ href: string; title: string }> = ({
  href,
  title,
  children,
}): React.ReactElement => (
  <a
    href={href}
    title={title}
    onClick={(event): void => {
      event.preventDefault();
      navigate(href);
    }}
  >
    {children}
  </a>
);
