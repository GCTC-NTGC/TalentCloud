import dayjs from "dayjs";
import { readableDateTime } from "./dates";

describe("readableDateTime", (): void => {
  it("20:02 08/16/2018 in 'en' becomes 'Thursday, August 16, 2018 8:02 PM'", (): void => {
    const date = dayjs("20:02 08/16/2018").toDate();
    const expected = "Thursday, August 16, 2018 8:02 PM";
    expect(readableDateTime("en", date)).toEqual(expected);
  });
  it("20:02 08/16/2018 in 'fr' becomes 'jeudi 16 août 2018 20:02'", (): void => {
    const date = dayjs("20:02 08/16/2018").toDate();
    const expected = "jeudi 16 août 2018 20:02";
    expect(readableDateTime("fr", date)).toEqual(expected);
  });
});
