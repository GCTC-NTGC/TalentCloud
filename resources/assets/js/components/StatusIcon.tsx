import React from "react";

export enum IconStatus {
  ASSESSMENT = "fas fa-question-circle",
  COMPLETE = "fas fa-check-circle",
  DEFAULT = "far fa-circle",
  ERROR = "fas fa-exclamation-circle",
  READY = "fas fa-check-circle",
  RECEIVED = "fas fa-exclamation-circle",
}

interface StatusIconProps {
  /* Clone string for color definition, i.e. "slow" or "c1".
  Defaults are built-in based on status but can be overridden. */
  color?: string;
  /* Clone font size setting, i.e. "small" or "h4". */
  size: string;
  /* Enum for status, exported from component file. */
  status: IconStatus;
}

const StatusIcon: React.FC<StatusIconProps> = ({
  color,
  size,
  status,
}): React.ReactElement => {
  let defaultColor: string;
  if (color === undefined) {
    switch (status) {
      case IconStatus.COMPLETE:
      case IconStatus.READY:
        defaultColor = "go";
        break;
      case IconStatus.ERROR:
        defaultColor = "stop";
        break;
      case IconStatus.ASSESSMENT:
        defaultColor = "slow";
        break;
      default:
        defaultColor = "c1";
    }
  } else {
    defaultColor = color;
  }

  return (
    <i className={status} data-c-color={defaultColor} data-c-font-size={size} />
  );
};

export default StatusIcon;
