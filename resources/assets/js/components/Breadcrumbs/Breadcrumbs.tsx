import * as React from "react";
import BreadcrumbItem from "./BreadcrumbsItem";

export interface BreadCrumbItemType {
  href: string;
  title: string;
}

export interface BreadCrumbsProps {
  fontColor?: string;
  crumbs?: BreadCrumbItemType[];
  children?: React.ReactNode;
  margin?: string;
}

const BreadCrumbs: React.FunctionComponent<BreadCrumbsProps> = ({
  fontColor,
  crumbs,
  children,
  margin,
}): React.ReactElement => {
  return (
    <nav
      aria-label="breadcrumb"
      data-c-breadcrumbs
      data-c-colour={fontColor}
      data-c-margin={margin}
    >
      <ol>
        {crumbs &&
          crumbs.map(
            ({ title, href }): React.ReactElement => {
              return <BreadcrumbItem key={title} href={href} title={title} />;
            },
          )}
        {children}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
