import { GlossetaSearchResult } from "../../types/glosseta-lookup-item";
import { getGlossaryTerm } from "../client/glosseta/glosseta.api.client";

export const fetchGlossaryTerm = async (term: string, locale: string): Promise<GlossetaSearchResult> => {
    let glossarySearchResult = {} as GlossetaSearchResult;
    glossarySearchResult.term = term;
    glossarySearchResult.category = "unavailable";
    glossarySearchResult.definition = "";
    glossarySearchResult.transactionId = "";
    glossarySearchResult.isError = false;
    glossarySearchResult.isAvailable = false;

    try {
        const glossaryTerm = await getGlossaryTerm(term, locale);

        if (glossaryTerm && glossaryTerm.term && glossaryTerm.definition && glossaryTerm.providerId && glossaryTerm.category) {
            glossarySearchResult.category = glossaryTerm.category;
            glossarySearchResult.definition = glossaryTerm.definition;
            glossarySearchResult.term = glossaryTerm.term;
            glossarySearchResult.transactionId = glossaryTerm.providerId;
            glossarySearchResult.isAvailable = true;
        }

    } catch (error) {
        console.log(`[Unable to find Glossary term] term=${term}`)
        glossarySearchResult.isError = true;
    }

    return glossarySearchResult;
}
