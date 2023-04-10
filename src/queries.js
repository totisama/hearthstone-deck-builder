import { gql } from '@apollo/client'
import { DEFAULT_LOCALE } from './constants'

export const GET_METADATA = gql`
query Metadata {
  metadata @rest(type: "Get", path: "/metadata?locale=${DEFAULT_LOCALE}") {
    classes {
      id
      slug
      name
    }
    filterableFields
    keywords {
      id
      slug
      name
    }
    minionTypes {
      id
      slug
      name
    }
    rarities {
      id
      slug
      name
    }
    sets {
      id
      slug
      name
    }
    spellSchools
  }
}
`
