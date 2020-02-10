/* eslint-disable @typescript-eslint/camelcase */
import { User } from "../models/types";

export const fakeUser = (
  id = 1,
  first_name = "Ari",
  last_name = "Bode",
  email = "manager@test.com",
  user_role_id = 2,
): User => ({
  id,
  first_name,
  last_name,
  email,
  is_confirmed: true,
  user_role_id,
  created_at: new Date("2020-01-01T01:01:00"),
  updated_at: new Date("2020-01-01T01:01:00"),
  is_priority: true,
  not_in_gov: false,
  gov_email: "gov_email@canada.ca",
});

export const fakeUsers = (): User[] => [
  fakeUser(),
  fakeUser(2, "Margarete", "Kuvalis", "mkuvalis@example.net", 1),
  fakeUser(3, "Deanna", "Altenwerth", "daltenwerth@example.net", 3),
];

export default { fakeUser, fakeUsers };
