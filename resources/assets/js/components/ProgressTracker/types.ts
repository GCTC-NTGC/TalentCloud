/* eslint-disable import/prefer-default-export */

export interface ProgressTrackerItem {
  state: "active" | "complete" | "error" | "null";
  label: string;
  title: string;
}
