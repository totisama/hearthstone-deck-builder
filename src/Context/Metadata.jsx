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
  const [classesIdsValue, setClassesIdsValue] = useState({})

  return (
    <MetadataContext.Provider value={{
      metadata,
      setMetadata,
      classesIdsValue,
      setClassesIdsValue
    }}
    >
      {children}
    </MetadataContext.Provider>
  )
}
