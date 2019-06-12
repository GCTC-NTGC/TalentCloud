import * as React from "react";
import { all } from "q";

export interface ContextBlockItemProps {
  title?: string;
  subtext?: string;
  active?: boolean;
  className?: string;
  contextId?: string;
  backgroundColor?: string;
  backgroundOpacity?: string;
  padding?: string;
  radius?: string;
  fontSize?: string;
  fontWeight?: string;
  margin?: string;
  reference?: React.RefObject<any>;
}

const ContextBlockItem: React.FunctionComponent<ContextBlockItemProps> = ({
  subtext,
  title,
  className,
  contextId,
  backgroundColor,
  backgroundOpacity,
  padding,
  radius,
  fontSize,
  fontWeight,
  margin,
  active,
  reference,
}): React.ReactElement => {
  return (
    <div
      className={`${className} ${active ? "active" : ""}`} //"job-builder-context-item active"
      data-tc-wenv-id={contextId} //"Pace1"
      data-c-background={
        (backgroundColor && `${backgroundColor}(${backgroundOpacity})`) ||
        "grey(20)"
      } //"grey(20)"
      data-c-padding={padding || "all(normal)"} //"all(normal)"
      data-c-radius={radius || "rounded"} // "rounded"
    >
      {title && (
        <p
          data-c-font-size={fontSize || "small"} //"small"
          data-c-margin={margin || "bottom(half)"} //"bottom(half)"
          data-c-font-weight={fontWeight || "bold"} //"bold"
        >
          {title}
        </p>
      )}
      {subtext && (
        <p ref={reference} data-c-font-size={fontSize || "small"}>
          {subtext}
        </p>
      )}
    </div>
  );
};

export default ContextBlockItem;
