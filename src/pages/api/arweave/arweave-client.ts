import Arweave from 'arweave';
import { fetch } from '../axios/axios-client';
import { tags } from '../../../types/arweave';
import { ARWEAVE_ENDPOINT } from '../../../utils/web3GlossaryConstants';
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

export const createTransaction = async (_data: string, _tags: tags) => {
    let transaction = await arweave.createTransaction({
        data: _data
    });

    _tags.tags.forEach(tag => {
        transaction.addTag(tag.key, tag.value)
    });

    console.log("-------Transaction-------");

    console.log(transaction);

    await arweave.transactions.sign(transaction);

    let uploader = await arweave.transactions.getUploader(transaction);

    console.log("-------Beginning to upload data -------");

    while (!uploader.isComplete) {
        try {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        } catch (e) {
            console.log(`[Error occurred uploading data], error=${e}`);
        }
    }

    // Read the transaction status
    arweave.transactions.getStatus(transaction.id).then(status => {
        console.log("-------transaction status-------")
        console.log(status);
    })

    // Read data from Arweave
    arweave.transactions.getData(transaction.id, {
        decode: true, string: true
    }).then(response => {
        console.log('data: ', response)
    })
}

export const getWalletBalance = async () => {
    arweave.wallets.getBalance(ARWEAVE_ADDRESS as string).then((balance) => {
        let winston = balance;
        let ar = arweave.ar.winstonToAr(balance);

        return ar;
    });
}

export const fetchDataFromOneTransaction = async (transactionId: string) => {
    const request = `${ARWEAVE_ENDPOINT}${transactionId}`;
    let response = await fetch(request);
    return response;
}

export const fetchTransactionIdsByTag = async (tag: string) => {
    return;
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
}