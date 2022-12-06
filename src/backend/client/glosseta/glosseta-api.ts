import { ApolloClient, InMemoryCache } from "@apollo/client"
import { GET_GLOSSARY_TERM } from "../../resources/graphql/queries/GetGlossaryTerm";
import { GLOSSETA_API_ENDPOINT } from "../../../utils/glosseta-constants";
import ErrorHandlingUtil from "../../utils/error.handling.utils";

const glossetaClient = new ApolloClient({
    uri: GLOSSETA_API_ENDPOINT,
    cache: new InMemoryCache(),
});

interface GlossaryTerm {
    name: string,
    definition: string,
    category: string,
}

const errorHandlingUtil = new ErrorHandlingUtil();

export const getGlossaryTerm = async (name: string): Promise<GlossaryTerm> => {
    let glossaryTerm = {} as GlossaryTerm;

    try {
        const { data } = await glossetaClient.query({
            query: GET_GLOSSARY_TERM,
            variables: {
                "name": name
            },
        });

        glossaryTerm.name = data.GetGlossaryTerm.name;
        glossaryTerm.definition = data.GetGlossaryTerm.definition;
        glossaryTerm.category = data.GetGlossaryTerm.category;

    } catch (error) {
        const errorMessage = errorHandlingUtil.getErrorMessage(error);
        console.log(`[Unable to find term] term=${name}, error=${errorMessage}`)
        throw new Error(errorMessage)
    }

    return glossaryTerm;
}