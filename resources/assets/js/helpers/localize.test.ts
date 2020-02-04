import fakeJob from "../fakeData/fakeJob";
import { localizeField } from "./localize";

describe("localize", (): void => {
  describe("localizeField()", (): void => {
    it("correctly gets english title from fakeJob", (): void => {
      const job = fakeJob();
      expect(localizeField("en", job, "title")).toEqual(job.title.en);
    });
    it("correctly gets french title from fakeJob", (): void => {
      const job = fakeJob();
      expect(localizeField("fr", job, "title")).toEqual(job.title.fr);
    });
    it("Sanity check that fakeJob has different title in en and fr", (): void => {
      const job = fakeJob();
      expect(job.title.en === job.title.fr).toEqual(false);
    });
    it("works on a non-typed object", (): void => {
      const newObj = {
        id: 4,
        title: {
          en: "New",
          fr: "Nouvelle",
        },
      }
      expect(localizeField('fr', newObj, 'title')).toEqual(newObj.title.fr);
    });
    it("works on an object with more languages", (): void => {
      const newObj = {
        id: 4,
        title: {
          en: "New",
          fr: "Nouvelle",
          es: "Nueva"
        },
      }
      expect(localizeField('fr', newObj, 'title')).toEqual(newObj.title.fr);
    });
  });
});
