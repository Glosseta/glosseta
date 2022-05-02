# Glosseta (🔎, 🧠)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Follow on Twitter](https://img.shields.io/badge/social-Twitter-1DA1F2?logo=twitter)](https://twitter.com/Glossetadotcom)

Glosseta is an open, decentralized Web3(i.e. the new internet backed by blockchains) glossary for protocols, terms, people, applications, and more. Glosseta aims to be the long term companion of anyone looking to demystifying the Web3 space and ecosystem with the north star vision of being the best open, localized and decentralized educational platform for anybody of any skill level.

## Mission Statement

Glossetas' mission is to provide the best open, localized and decentralized educational platform for anybody of any skill level looking to learn about Web3. We strive to provide the most accurate, accessible and meaningful content for learning about the concepts, protocols, people and applications surrounding Web3 and its ecosystem. All of the content available through Glosseta is stored on the [Arweave storage protocol](https://www.arweave.org/) ensuring our educational content will live forever and unobstructed by those trying to censor education as a public good. The current landscape of the Web3 education space is very developer centric and doesn't do justice for the average person who's looking to learn the ecosystem and simply doesn't know where to start.  At it's core, Glosseta is on a mission to make a Web3 educational platform as a public good for the entire globe who at this time is feed misinformation from varying online sources, influential figures and mainstream media.  While we might begin as a glossary, the north star vision is to become the prominent open, localized and decentralized educational platform for those looking to onboard into the Web3 space.  If Web3 is to succeed, the educational content around it must be globally accessible, un-censorable and digestible to everyone.

## What Success looks like for Glosseta

If Glosseta is successful in its mission, people all over the globe will have an open, localized, decentralized and accessible educational platform available to guide them on their way to learning and mastering Web3. Every participant in the Web3 space, new or existing, regardless of skill level, will have a common companion to lean on to make sense of the fast moving landscape of Web3.

If you contribute to Glosseta, our mission is to be able to have you look back at the work you've done and realize the impact it has made on a global level changing the perceptions of those who thought Web3 was only about "magic internet money" or ponzi schemes.  To the potential sponsors amd donors of Glosseta, the impact you're contributions can make will reach a global audience helping to reduce the misinformation spread about Web3 and enabling the next wave of curious minds the best opportunity to flourish on their transition into the space.

To stick to it's core values, Glosseta must always remain a public good and it's content always served from an open and decentrailzed source.  We will always strive to provide the best educational content available to all our users to ensure the community is the best equipped to demystify Web3.  We move forward with a bias for action and look to improve ourselves, along with the platform, using a [growth mindset](https://www.mindsethealth.com/matter/growth-vs-fixed-mindset). All contributors looking to help Glosseta grow can expect to have their voices heard, be treated with respect and be a central part in it's development.  Not only will we be able to help others learn new and exciting Web3 concepts, we ourselves will grow to become that much more knowledgeable in the space and come to know when somebody is spreading misinformation.   Education should be a human right and Glosseta is here to help push the world towards that coming to fruition.

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

Ah so you want to know the recipe to our secret sauce eh?  Well sure, Glosseta is all about open source and stores all the definitions currently in it's knowledge bank in `resources/master_term_bank_en.csv`.  A companion script called the [arweave-json-uploader](https://github.com/narbs91/arweave-json-uploader) is used to upload this data to the Arweave network in bulk fashion.  Though uploading data to the network does cost AR token, the costs so far to upload the current terms onto the network has been in the level of micro-pennies per term.

## How to Contribute

Please check out the [Contributing guide](CONTRIBUTING.md) on how to get started.

## Definition requests

If you have a new definition you wish to be added to the knowledge base, please do the follow:

1. [Open a new definition intake request](https://github.com/narbs91/glosseta/issues/new?assignees=&labels=definition&template=definition-request.yml&title=%5BDefinition+Request%5D%3A+)
2. Fill out the form with the requested information
3. Tag @narbs91 so that he can upload it to the Arweave network.  Depending on the volume of requests that end up coming in, the definition will be uploaded within 24 hours of submission

## Reporting Bugs/Feature requests

If you find a bug or think of an awesome new feature for the site please take the time to fill out an issue by clicking on the issues tab and clicking "New Issue" to fill out one of our issue templates.

## Learn More

If you're looking to learn more about Web3 in general the following set of [resources](https://github.com/Developer-DAO/resources) put together by the [Developer-Dao](https://www.developerdao.com/) is a great starting point.
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.narbeh.xyz/"><img src="https://avatars.githubusercontent.com/u/29411347?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Narb</b></sub></a><br /><a href="#infra-narbs91" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/narbs91/glosseta/commits?author=narbs91" title="Tests">⚠️</a> <a href="https://github.com/narbs91/glosseta/commits?author=narbs91" title="Code">💻</a> <a href="#data-narbs91" title="Data">🔣</a> <a href="https://github.com/narbs91/glosseta/commits?author=narbs91" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/shakeib98/"><img src="https://avatars.githubusercontent.com/u/28858011?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shakeib Shaida</b></sub></a><br /><a href="#data-shakeib98" title="Data">🔣</a></td>
    <td align="center"><a href="https://naftalimurgor.netlify.app"><img src="https://avatars.githubusercontent.com/u/37052032?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Murgor</b></sub></a><br /><a href="#data-naftalimurgor" title="Data">🔣</a> <a href="https://github.com/narbs91/glosseta/commits?author=naftalimurgor" title="Code">💻</a></td>
    <td align="center"><a href="https://cosisaxis.co/"><img src="https://avatars.githubusercontent.com/u/72054802?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cosi</b></sub></a><br /><a href="https://github.com/narbs91/glosseta/commits?author=cosisaxis" title="Code">💻</a> <a href="#data-cosisaxis" title="Data">🔣</a></td>
    <td align="center"><a href="https://github.com/alireza-jahandoost"><img src="https://avatars.githubusercontent.com/u/78685132?v=4?s=100" width="100px;" alt=""/><br /><sub><b>alireza jahandoost</b></sub></a><br /><a href="https://github.com/narbs91/glosseta/commits?author=alireza-jahandoost" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
