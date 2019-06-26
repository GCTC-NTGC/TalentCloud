/* eslint-disable import/prefer-default-export */
import { FormattedMessage } from "react-intl";

export interface ProgressTrackerItem {
  state: "active" | "complete" | "error" | "null";
  label: FormattedMessage.MessageDescriptor;
  title: FormattedMessage.MessageDescriptor;
}
