/* eslint-disable import/prefer-default-export */

export type ProgressTrackerState = "active" | "complete" | "error" | "null";

export interface ProgressTrackerItem {
  state: ProgressTrackerState;
  label: string;
  title: string;
}
