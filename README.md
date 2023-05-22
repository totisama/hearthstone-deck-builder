<h1 align="center">Hearthstone Card Search and Deck Builder</h1>

### Description

The purpose of this project was to practice my React skills trying to replicate most of the functionalities and design of the official Hearthstone page: https://hearthstone.blizzard.com/en-us/cards

The project is divided in two sections. The first one is a page to search for cards using different filters. The second one will give the user the option to choose a Hero, create a deck and be able to generate the deck code to use it inside of the game.

Most of the information and images shown were obtained through the Blizzard API https://develop.battle.net and the official Hearthstone page https://hearthstone.blizzard.com/en-us/cards

Card library:
![Alt text](/public/cardsLibrary.png 'Cards Library')

Deck builder:
![Alt text](/public/heroSelect.png 'Hero Select')
![Alt text](/public/deckBuilder.png 'Deck Builder')

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

https://hearthstone-deck-builder-gilt.vercel.app

### Repository:

https://github.com/totisama/hearthstone-deck-builder
