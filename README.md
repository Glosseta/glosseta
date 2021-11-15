Welcome to the Glosseta website repo!  What is Glosseta you ask?  Great question, Glosseta is new internet's (i.e. web3) glossary for common crypto lingo, terms, people, applications, etc... you may see floating out on various social media platforms and elsewhere on the web.  What sets Glosseta apart from the rest is that the definitions you see on the site are stored themselves on the [Arweave storage protocol](https://www.arweave.org) meaning they will live forever on the decentralized web.  It's our secret sauce for what puts the meta in Glosseta and for what makes us a great companion in your explorations in web3 no matter you skill level.  We hope to be your long term companion on your Web3 journey and look to be the principal means of demystifying the awesome future we are all looking to build.

## Getting Started

After pulling the code, run the following commands to get the app up and running:

1. `nvm install`
2. `yarn`
3. `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to get Glosseta up and running.

## Tech stack
- [Next.js](https://nextjs.org/docs)
- [Chakra-UI](https://chakra-ui.com/docs/getting-started)
- [Arweave-js](https://github.com/ArweaveTeam/arweave-js)
- [Apollo-client](https://www.apollographql.com/docs/react/)
- [next-i18next](https://github.com/isaachinman/next-i18next)

## How do terms get uploaded?

Ah so you want to know the recipe to our secret sauce eh?  Well sure, Glosseta is all about open source and stores all the definitions currently in it's knowledge bank in `resources/master_term_bank_en.csv`.  A companion script called the [arweave-json-uploader](https://github.com/narbs91/arweave-json-uploader) created by yours truly (@narbs91) is used to upload this data to the Arweave network in bulk fashion.  Though uploading data to the network does cost AR token (and I have been using my own funds to upload), the costs so far to upload 20 terms onto the network has cost in the total range of micro-pennies which is a wonderful feature in itself 😎

## How to Contribute

Please check out the [Contributing guide](CONTRIBUTING.md) on how to get started.

## Reporting Bugs/Feature/definition requests

If you find a bug, think of an awesome new feature or have a term in mind tha we may be missing on the site please take the time to fill out an issue by clicking on the issues tab and clicking "New Issue" to fill out one of our issue templates.

## Learn More

If you're looking to learn more about web3 in general the following set of [resources](https://github.com/Developer-DAO/resources) put together by the [Developer-Dao](https://www.developerdao.com/) is a great starting point.
