import { fetchGlossaryTerm } from "../../../src/backend/service/glosseta.service";

let mockGetGlossaryTerm = jest.fn();
jest.mock("../../../src/backend/client/glosseta/glosseta.api.client", () => {
    return {
        getGlossaryTerm: () => mockGetGlossaryTerm()
    };
});

describe("Test Glosseta API Client", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Returns correct response on successful api call", async () => {
        const term = "term";
        const definition = "definition";
        const isAvailable = true;
        const category = "category";
        const transactionId = "1";
        const isError = false;

        mockGetGlossaryTerm.mockResolvedValue({
            term: term,
            definition: definition,
            category: category,
            providerId: transactionId
        });

        const response = await fetchGlossaryTerm(term, "EN");

        expect(response.term).toEqual(term);
        expect(response.definition).toEqual(definition);
        expect(response.category).toEqual(category);
        expect(response.isAvailable).toEqual(isAvailable);
        expect(response.transactionId).toEqual(transactionId);
        expect(response.isError).toEqual(isError);
    })

    it("Returns correct response on when term not found api call", async () => {
        const term = "term";
        const definition = "";
        const isAvailable = false;
        const category = "unavailable";
        const transactionId = "";
        const isError = false;

        mockGetGlossaryTerm.mockResolvedValue({
            term: null,
            definition: null,
            category: null,
            providerId: null
        });

        const response = await fetchGlossaryTerm(term, "EN");

        expect(response.term).toEqual(term);
        expect(response.definition).toEqual(definition);
        expect(response.category).toEqual(category);
        expect(response.isAvailable).toEqual(isAvailable);
        expect(response.transactionId).toEqual(transactionId);
        expect(response.isError).toEqual(isError);
    })

    it("Returns correct response on when term not found api call", async () => {
        const term = "term";
        const definition = "";
        const isAvailable = false;
        const category = "unavailable";
        const transactionId = "";
        const isError = true;

        mockGetGlossaryTerm.mockRejectedValue({});

        const response = await fetchGlossaryTerm(term, "EN");

        expect(response.term).toEqual(term);
        expect(response.definition).toEqual(definition);
        expect(response.category).toEqual(category);
        expect(response.isAvailable).toEqual(isAvailable);
        expect(response.transactionId).toEqual(transactionId);
        expect(response.isError).toEqual(isError);
    })
})