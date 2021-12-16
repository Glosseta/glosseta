import { gql } from "@apollo/client";
import { apolloClient } from './apollo-client';

export const fetchTransactionIdsByTag = async (tag: string, locale: string) => {
    let tags = [
        { "name": "source", "values": ["GLOSSETA-PROD"] }, 
        { "name": "locale", "values": [locale] }, 
        { "name": "term", "values": [tag] }
    ] as any;
    

    const FIND_BY_TAG_QUERY = gql`
        query getDataByTags($tags: [TagFilter!]) {
        transactions(tags: $tags) {
            edges {
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }
    `;

    try {
        const { data } = await apolloClient.query({
            query: FIND_BY_TAG_QUERY,
            variables: {
                "tags": tags
            }
        });

        return {
            props: {
                edges: data.transactions.edges
            }
        };
    } catch (error) {
        console.log(`[Error communicating with arweave graphql api] error=${error}`);

        return {
            props: {
                edges: "error"
            }
        }
    }

}