import { createContext, useState } from 'react'

export const MetadataContext = createContext()

export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({
    classes: [],
    keywords: [],
    minionTypes: [],
    rarities: [],
    sets: [],
    types: [],
    spellSchools: []
  })

  return (
    <MetadataContext.Provider value={{
      metadata,
      setMetadata
    }}
    >
      {children}
    </MetadataContext.Provider>
  )
}
