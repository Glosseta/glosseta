//Import needed as dependency in test scope
import setimmediate from "setimmediate";
import getTermList from "../../src/utils/termListUtil";

// TODO: See if there's a better way to test this util, mocking fast-csv seems to be non-trivial and will require a bit more investigation
describe("Tests building glossary terms", () => {
  it("Reads and returns data from CSV", async () => {
    const resp = await getTermList("en");

    expect(resp).not.toBeNull();
    expect(resp.length > 0).toBeTruthy();

    resp.forEach((item) => {
      expect(item.term).not.toBeNull();
      expect(item.category).not.toBeNull();
      expect(item.definition).not.toBeNull();
    });
  });
});
