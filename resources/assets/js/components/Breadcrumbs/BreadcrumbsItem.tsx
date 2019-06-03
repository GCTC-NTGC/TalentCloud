import * as React from "react";

interface BreadcrumbItemProps {
  href: string;
  title: string;
}

const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps> = ({
  href,
  title,
}): React.ReactElement => {
  return (
    <li>
      <a href={href} title={title}>
        {title}
      </a>
      <i className="fa fa-caret-right" />
    </li>
  );
};

export default BreadcrumbItem;
