export const MANA_COSTS = [
  { slug: 0, label: '0' },
  { slug: 1, label: '1' },
  { slug: 2, label: '2' },
  { slug: 3, label: '3' },
  { slug: 4, label: '4' },
  { slug: 5, label: '5' },
  { slug: 6, label: '6' },
  { slug: 7, label: '7' },
  { slug: 8, label: '8' },
  { slug: 9, label: '9' },
  { slug: 10, label: '10+' }
]

export const ATTACK_VALUES = [
  { slug: '', label: 'Any Attack' },
  { slug: 0, label: 'Attack: 0' },
  { slug: 1, label: 'Attack: 1' },
  { slug: 2, label: 'Attack: 2' },
  { slug: 3, label: 'Attack: 3' },
  { slug: 4, label: 'Attack: 4' },
  { slug: 5, label: 'Attack: 5' },
  { slug: 6, label: 'Attack: 6' },
  { slug: 7, label: 'Attack: 7' },
  { slug: 8, label: 'Attack: 8' },
  { slug: 9, label: 'Attack: 9' },
  { slug: 10, label: 'Attack: 10+' }
]

export const HEALTH_VALUES = [
  { slug: '', label: 'Any Health' },
  { slug: 1, label: 'Health: 1' },
  { slug: 2, label: 'Health: 2' },
  { slug: 3, label: 'Health: 3' },
  { slug: 4, label: 'Health: 4' },
  { slug: 5, label: 'Health: 5' },
  { slug: 6, label: 'Health: 6' },
  { slug: 7, label: 'Health: 7' },
  { slug: 8, label: 'Health: 8' },
  { slug: 9, label: 'Health: 9' },
  { slug: 10, label: 'Health: 10+' }
]

export const MANA_COSTS_SELECT = [
  { slug: '', label: 'Mana' },
  { slug: 0, label: 'Mana: 0' },
  { slug: 1, label: 'Mana: 1' },
  { slug: 2, label: 'Mana: 2' },
  { slug: 3, label: 'Mana: 3' },
  { slug: 4, label: 'Mana: 4' },
  { slug: 5, label: 'Mana: 5' },
  { slug: 6, label: 'Mana: 6' },
  { slug: 7, label: 'Mana: 7' },
  { slug: 8, label: 'Mana: 8' },
  { slug: 9, label: 'Mana: 9' },
  { slug: 10, label: 'Mana: 10+' }
]

export const API_HOST = 'https://us.api.blizzard.com/hearthstone'

export const DEFAULT_LOCALE = 'en_US'

export const WINDOW_SIZES_VALUE = {
  XS_VALUE: 256,
  SM_VALUE: 512,
  MD_VALUE: 768,
  LG_VALUE: 1024,
  XL_VALUE: 1280
}

export const WINDOW_SIZES = {
  EXTRA_SMALL: 'XS',
  SMALL: 'SM',
  MEDIUM: 'MD',
  LARGE: 'LG',
  EXTRA_LARGE: 'XL'
}

export const NUMBER_FILTERS_KEY = {
  manaCost: 'Mana',
  attack: 'Attack',
  health: 'Health'
}

export const HERO_CLASSES = [
  { id: 0, image: 'deathknight.png', name: 'Death Knight', value: 'deathknight' },
  { id: 1, image: 'demonhunter.png', name: 'Demon Hunter', value: 'demonhunter' },
  { id: 2, image: 'druid.png', name: 'Druid', value: 'druid' },
  { id: 3, image: 'hunter.png', name: 'Hunter', value: 'hunter' },
  { id: 4, image: 'mage.png', name: 'Mage', value: 'mage' },
  { id: 5, image: 'paladin.png', name: 'Paladin', value: 'paladin' },
  { id: 6, image: 'priest.png', name: 'Priest', value: 'priest' },
  { id: 7, image: 'rogue.png', name: 'Rogue', value: 'rogue' },
  { id: 8, image: 'shaman.png', name: 'Shaman', value: 'shaman' },
  { id: 9, image: 'warlock.png', name: 'Warlock', value: 'warlock' },
  { id: 10, image: 'warrior.png', name: 'Warrior', value: 'warrior' }
]

export const HEROS_LIST = [
  'deathknight',
  'demonhunter',
  'druid',
  'hunter',
  'mage',
  'paladin',
  'priest',
  'rogue',
  'shaman',
  'warlock',
  'warrior'
]
