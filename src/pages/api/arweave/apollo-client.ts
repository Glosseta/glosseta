import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ARWEAVE_GRAPHQL } from '../../../utils/web3GlossaryConstants'


export const apolloClient = new ApolloClient({
    uri: ARWEAVE_GRAPHQL,
    cache: new InMemoryCache(),
});