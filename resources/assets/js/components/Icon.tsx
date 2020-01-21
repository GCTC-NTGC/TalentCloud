import * as React from "react";
import { useIntl, defineMessages } from "react-intl";

interface IconProps {
  icon: string;
  messageId: string;
  accessibleText: string;
  sematicIcon: boolean;
}

const Icon: React.FunctionComponent<IconProps> = ({
  icon,
  messageId,
  accessibleText,
  sematicIcon,
}) => {
  const intl = useIntl();

  const iconMessages = defineMessages({
    accessibleText: {
      id: `icon.${messageId}`,
      defaultMessage: `${accessibleText}`,
      description: "Accessible text for icon.",
    },
  });

  return (
    <>
      {sematicIcon ? (
        <>
          <i
            aria-hidden="true"
            className={icon}
            title={intl.formatMessage(iconMessages.accessibleText)}
          />
          <span data-c-visibility="invisible">
            {intl.formatMessage(iconMessages.accessibleText)}
          </span>
        </>
      ) : (
        <i className={icon} />
      )}
    </>
  );
};

export default Icon;
