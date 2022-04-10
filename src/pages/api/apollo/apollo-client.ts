import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { ARWEAVE_GRAPHQL, GITHUB_ENDPOINT } from '../../../utils/glosseta-constants'

export const arweaveApolloClient = new ApolloClient({
    uri: ARWEAVE_GRAPHQL,
    cache: new InMemoryCache(),
});

export const githubApolloClient = new ApolloClient({
    link: new HttpLink({
        uri: GITHUB_ENDPOINT,
        headers: {"Authorization" : `Bearer ${process.env.GITHUB_API_KEY}`},
    }),
    cache: new InMemoryCache(),
})