Welcome to the Glosseta website repo!  What is Glosseta you ask?  Great question, Glosseta is the new internet's (i.e. web3) glossary for common crypto lingo, terms, people, applications, etc... you may see floating out on various social media platforms and elsewhere on the web.  What sets Glosseta apart from the rest is that the definitions you see on the site are stored themselves on the [Arweave storage protocol](https://www.arweave.org) meaning they will live forever on the decentralized web.  It's the secret sauce for what puts the meta in Glosseta and what makes us a great companion in your explorations in web3 no matter you skill level.  Glosseta hopes to be your long term companion on your Web3 journey and look to be the principal means of demystifying the awesome future we are all looking to build.

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

Ah so you want to know the recipe to our secret sauce eh?  Well sure, Glosseta is all about open source and stores all the definitions currently in it's knowledge bank in `resources/master_term_bank_en.csv`.  A companion script called the [arweave-json-uploader](https://github.com/narbs91/arweave-json-uploader) is used to upload this data to the Arweave network in bulk fashion.  Though uploading data to the network does cost AR token (and I have been using my own funds to upload), the costs so far to upload 20 terms onto the network has been in the total range of micro-pennies which is a wonderful feature in itself 😎

## How to Contribute

Please check out the [Contributing guide](CONTRIBUTING.md) on how to get started.

## Definition requests

If you have a new definition you wish to be added to the knowledge base, please do the follow:

1. [Open a new definition intake request](https://github.com/narbs91/glosseta/issues/new?assignees=&labels=definition&template=definition-request.yml&title=%5BDefinition+Request%5D%3A+)
2. Fill out the form with the requested information
3. Tag @narbs91 so that he can upload it to the Arweave network.  Depending on the volume of requests that end up coming in, the definition will be uploaded within 24 hours of submission

## Reporting Bugs/Feature

If you find a bug pr think of an awesome new feature for the site please take the time to fill out an issue by clicking on the issues tab and clicking "New Issue" to fill out one of our issue templates.

## Learn More

If you're looking to learn more about web3 in general the following set of [resources](https://github.com/Developer-DAO/resources) put together by the [Developer-Dao](https://www.developerdao.com/) is a great starting point.

## Enjoying Glosseta?

If you're enjoying Glosseta and want to see it's continued development, please consider donating a small amount of ETH to help keep the lights on.  I'm a one man team at the moment developing, designing and paying all the costs associated with the website (hosting, domain name, uploading the definitions, etc...) out of my own pocket because I believe in free education and making sure people don't feel overwhelmed when they enter the web3 space. Any little bit will go a long way to ensuring Glosseta continues to thrive and evolve to serve the new wave of web3 enthusiasts.  Remember we're all going to make it (WAGMI)!

ETH address: `0xF88dF48Be7Da15CBa750D9EAdF5B6C50a8cA9Fe2`