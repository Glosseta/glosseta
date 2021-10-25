import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ARWEAVE_GRAPHQL } from '../../../utils/glosseta-constants'


export const apolloClient = new ApolloClient({
    uri: ARWEAVE_GRAPHQL,
    cache: new InMemoryCache(),
});