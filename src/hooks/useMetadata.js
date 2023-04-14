import { useContext } from 'react'
import { getToken } from '../services'
import { useLazyQuery } from '@apollo/client'
import { GET_METADATA } from '../queries'
import { MetadataContext } from '../Context/Metadata'

export const useMetadata = () => {
  const { metadata, setMetadata } = useContext(MetadataContext)
  const [getResult, { loading }] = useLazyQuery(GET_METADATA)

  const getMetadata = async () => {
    const token = await getToken()

    const result = await getResult({
      context: {
        headers: {
          authorization: `Bearer ${
            token
          }`
        }
      }
    })

    const metadata = result?.data?.metadata

    if (!metadata) {
      throw new Error('Error getting metadata')
    }

    setMetadata(metadata)
  }

  return {
    metadata, loading, getMetadata
  }
}
