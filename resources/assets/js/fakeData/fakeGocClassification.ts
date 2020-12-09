import {GocClassification, Classification} from "../models/types";

export const fakeGocClassifications = (
): GocClassification[] => ([
  {
    classification : {"key": "CS"},
    level : 1,
    order : 0,
  },
  {
    classification : {"key": "CS"},
    level : 2,
    order : 0,
  },
  {
    classification : {"key": "CS"},
    level : 3,
    order : 0,
  },
  {
    classification : {"key": "CS"},
    level : 4,
    order : 0,
  },
  {
    classification : {"key": "CS"},
    level : 5,
    order : 0,
  },
  {
    classification : {"key": "AS"},
    level : 1,
    order : 0,
  },
  {
    classification : {"key": "AS"},
    level : 2,
    order : 0,
  },
  {
    classification : {"key": "AS"},
    level : 3,
    order : 0,
  }
]);

/*
export interface GocClassification {
  classification : Classification;
  level : Number;
  order : Number; // Used to allow user to order the list of classifications
}
*/
