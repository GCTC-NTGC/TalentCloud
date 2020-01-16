import * as React from "react";

interface IconProps {
  icon: string;
  accessibleText: string;
  sematicIcon: boolean;
}

const Icon: React.FunctionComponent<IconProps> = ({
  icon,
  accessibleText,
  sematicIcon,
}) => {
  return (
    <>
      {sematicIcon ? (
        <>
          <i
            aria-hidden="true"
            className={icon}
            title={accessibleText}
          />
          <span data-c-visibility="invisible">
            {accessibleText}
          </span>
        </>
      ) : (
        <i className={icon} />
      )}
    </>
  );
};

export default Icon;
