import { ApolloClient, InMemoryCache } from "@apollo/client"
import { GET_GLOSSARY_TERM } from "../../resources/graphql/queries/GetGlossaryTerm";
import { GLOSSETA_API_ENDPOINT } from "../../../utils/glosseta-constants";
import ErrorHandlingUtil from "../../utils/error.handling.utils";

const glossetaClient = new ApolloClient({
    uri: GLOSSETA_API_ENDPOINT,
    cache: new InMemoryCache(),
});

interface GlossaryTerm {
    term: string,
    definition: string,
    category: string,
    providerId: string
}

const errorHandlingUtil = new ErrorHandlingUtil();

export const getGlossaryTerm = async (term: string, locale: string): Promise<GlossaryTerm | undefined> => {

    try {
        let glossaryTerm = {} as GlossaryTerm;

        // TODO: When localized glossary entries are available change the  'locale` var to `locale.toUpperCase()`
        const { data } = await glossetaClient.query({
            query: GET_GLOSSARY_TERM,
            variables: {
                "term": term,
                "locale": "EN"
            },
        });

        if (data.GetGlossaryTerm && data.GetGlossaryTerm.definition && data.GetGlossaryTerm.term && data.GetGlossaryTerm.providerId && data.GetGlossaryTerm.category) {
            glossaryTerm.term = data.GetGlossaryTerm.term;
            glossaryTerm.definition = data.GetGlossaryTerm.definition;
            glossaryTerm.category = data.GetGlossaryTerm.category;
            glossaryTerm.providerId = data.GetGlossaryTerm.providerId;
        }

        return glossaryTerm;

    } catch (error) {
        const errorMessage = errorHandlingUtil.getErrorMessage(error);
        console.log(`[Exception occurred while trying to find term from glosseta api] term=${term}, error=${errorMessage}`)
    }

    return undefined;
}