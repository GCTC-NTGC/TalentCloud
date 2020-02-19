/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion */
import { User } from "../models/types";
import { find } from "../helpers/queries";

const userRoles = [
  {
    id: 2,
    key: "upgradedManager",
    created_at: new Date("2019-01-01T01:01:00"),
    updated_at: new Date("2019-01-01T01:01:00"),
    name: {
      en: "Manager",
      fr: "Manager",
    },
  },
  {
    id: 1,
    key: "basic",
    created_at: new Date("2019-01-01T01:01:00"),
    updated_at: new Date("2019-01-01T01:01:00"),
    name: {
      en: "Applicant",
      fr: "Applicant",
    },
  },
  {
    id: 3,
    key: "admin",
    created_at: new Date("2019-01-01T01:01:00"),
    updated_at: new Date("2019-01-01T01:01:00"),
    name: {
      en: "Admin",
      fr: "Admin",
    },
  },
];

export const fakeUser = (
  id = 1,
  first_name = "Ari",
  last_name = "Bode",
  full_name = "Ari Bode",
  email = "manager@test.com",
  user_role_id = 2,
): User => ({
  id,
  first_name,
  last_name,
  full_name,
  email,
  is_confirmed: true,
  user_role_id,
  created_at: new Date("2020-01-01T01:01:00"),
  updated_at: new Date("2020-01-01T01:01:00"),
  is_priority: true,
  not_in_gov: false,
  gov_email: "gov_email@canada.ca",
  user_role: find(userRoles, user_role_id)!,
});

export const fakeUsers = (): User[] => [
  fakeUser(),
  fakeUser(
    2,
    "Margarete",
    "Kuvalis",
    "Margarete Kuvalis",
    "mkuvalis@example.net",
    1,
  ),
  fakeUser(
    3,
    "Deanna",
    "Altenwerth",
    "Deanna Altenwerth",
    "daltenwerth@example.net",
    3,
  ),
];

export default { fakeUser, fakeUsers };
