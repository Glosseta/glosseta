# How to contribute

Hi there, thanks you for your interest in helping Glosseta become more awesome!  At this point of the game I'm trying to get a feel for product fit and whether or not there is a demand for a tool like Glosseta.  That being said, more or less anything is on the table in terms of contributions; however, the biggest need at the moment are a need for translations of both the app elements and the actual term definitions.

## Setup local dev environment

1. Fork the glosseta repo and pull the code
2. Do `yarn && yarn build` to get setup
3. Run `yarn dev` to test run the app on `https://localhost:3000`

## Contribution guidelines

I ask that you please create an issue filling out the specified information with regards to template of choice (bug, feature, definition intake).  This will help me stay organized of things and keep somewhat of an order to the repo.  With that said, only pull-requests (PR's) with corresponding issues will be considered for review.

To start contributing, I ask all contributors to fork a copy of this repo. Once you have the project forked, you would then checkout a branch off your local copy of the project via `git checkout -b your_branch_name` per issue you pick up. You can name the branch what you want but be sure to give it some context around the issue you're working on.

## Open issues

If you're looking for a place to start, you should for sure check out the [open issues](https://github.com/narbs91/glosseta/issues) to see if there's anything up for grabs.  As always feel free to submit a feature request if you have a great idea of how the site can be improved.

## Translations

The app is translated using the [next-i18next](https://github.com/isaachinman/next-i18next) framework with the following list of languages put up for initial support:

- `en`
- `es`
- `fr`
- `de`
- `pt`
- `zh`

Though this list is not final by any means but just something I thought was a good start.  Right now the only locale with content is `en` as that is the limit of my translation skills so any help in this regard would be more then welcome.  There is also the definitions themselves that are stored on the Arweave network that currently are only available in english.  The master term list is held in this repo under `resources/master_term_bank_en.csv` which represents all the definitions that have been uploaded thus far.  You'll notice a `locale` field in the CSV that represents the given locale of the definition. Our North Star envisions having a definition for each language going forward as web3 belongs to the global community and everyone deserves access to this information.  As uploads take funds to actually complete (and done our of my own pocket), I will wait to see the reaction to Glosseta before committing to localized translations of the content.  Though if you are so inclined, you can create a PR to fill out a given master file for each given locale.

### Master term file structure

The master list of term definitions found under the `resources` directory is a CSV with the following rows:
- **Content-Type**:  This is the content type of the data to be uploaded.  This should always be `application/json`
- **term**:  This is the literal term to be defined
- **description**: This is the definition of the term.  Definitions should always be concise (2 sentences max) and written in a fashion so that people of all skill levels can understand
- **locale**: The locale of the given term and definition.  Valid locales at the moment are `en`, `es`, `fr`, `de`, `pt`, `zh` though more is intended to be added
- **source**:  This is a metadata tag used to ensure that the content is coming from the intended resources.  This should always be set to `GLOSSETA-PROD` unless otherwise specified
- **category**:  This is metadata to help identify what category a given term belongs under.  The current supported set is: `general`, `protocol`, `dao`, `token`, `people`, `application`