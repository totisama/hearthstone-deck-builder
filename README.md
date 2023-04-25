<h1 align="center">Hearthstone Card Search and Deck Builder</h1>

### Description

The purpose of this project was to practice my React skills trying to replicate most of the functionalities and design of the official Hearthstone page: https://hearthstone.blizzard.com/en-us/cards

The project is divided in two sections. The first one is a page to look for cards using different filters. The second one (Still In Progress) will give the user the option to choose a Hero, create a deck of 30 cards and be able to copy the deck to use it inside of the game.

Most of the information shown was obtained through the Blizzard API https://develop.battle.net

## Getting Started

To get started, you will first need to follow the [getting started guide](https://develop.battle.net/documentation/guides/getting-started) to create a new OAuth Client on develop.battle.net.

#### Installation

- Clone repository
  `git clone https://github.com/totisama/hearthstone-deck-builder`
- Once you have created your OAuth client on develop.battle.net, copy the `.env.example` file to a new `.env`, and fill in the values for the `CLIENT_ID` and `CLIENT_SECRET` variables.
- Inside of the project folder, run the following commands
  ```
  npm install
  npm run dev
  ```

### Stack

- React
- Sass
- Graphql
- Vite
- Vercel

### Try it here:

https://hearthstone-deck-builder-8rh6mmk8o-totisama.vercel.app/

### Repository:

https://github.com/totisama/hearthstone-deck-builder
