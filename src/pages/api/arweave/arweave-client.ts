import Arweave from 'arweave';
import { fetch } from '../axios/axios-client';
import { ARWEAVE_ENDPOINT } from '../../../utils/glosseta-constants';
import { gql } from "@apollo/client";
import { apolloClient } from './apollo-client';

const arweave = Arweave.init({
    host: 'arweave.net'
    // (leave object blank to interact with local network)
    // host: '127.0.0.1',
    // port: 1984,
    // protocol: 'http'
});

const ARWEAVE_ADDRESS = process.env.NEXT_PUBLIC_ARWEAVE_ADDRESS;

export const fetchDataFromOneTransaction = async (transactionId: string) => {
    const request = `${ARWEAVE_ENDPOINT}${transactionId}`;
    let response = await fetch(request);
    return response;
}

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

export const fetchTransactionsForWallet = async (walletId: string) => {
    const TRANSACTIONS_QUERY = gql`
        query getTransactions ($walletId: [String!]) {
        transactions(owners: $walletId) {
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
            query: TRANSACTIONS_QUERY,
            variables: {
                "walletId": [walletId]
            }
        });

        return {
            props: {
                transactions: data.transactions.edges
            },
        };
    } catch (error) {
        console.log(`[Error communicating with arweave graphql api] error=${error}`);

        return {
            props: {
                transactions: "error"
            }
        }
    }
}