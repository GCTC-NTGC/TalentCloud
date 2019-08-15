import * as React from "react";

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
  wrapperMargin?: string;
  titleMargin?: string;
  reference?: React.RefObject<HTMLParagraphElement>;
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
  wrapperMargin,
  titleMargin,
  active,
  reference,
}): React.ReactElement => {
  return (
    <div
      className={`${className || ""}${active ? " active" : ""}`}
      data-tc-wenv-id={contextId}
      data-c-background={
        (backgroundColor && `${backgroundColor}(${backgroundOpacity})`) ||
        "grey(20)"
      }
      data-c-padding={padding || "all(normal)"}
      data-c-radius={radius || "rounded"}
      data-c-margin={wrapperMargin || ""}
    >
      {title && (
        <p
          data-c-font-size={fontSize || "small"}
          data-c-margin={titleMargin || "bottom(half)"}
          data-c-font-weight={fontWeight || "bold"}
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
