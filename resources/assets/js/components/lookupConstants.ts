export enum ReviewStatusId {
  ScreenedOut = 1,
  StillThinking = 2,
  StillIn = 3
}

export type ReviewStatusName = "screened_out" | "still_thinking" | "still_in";

export enum CriteriaTypeId {
  Essential = 1,
  Asset = 2
}

export enum SkillTypeId {
  Soft = 1,
  Hard = 2
}

export enum SkillLevelId {
  Basic = 1,
  Intermediate = 2,
  Advanced = 3,
  Expert = 4
}
