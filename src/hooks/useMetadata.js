import { useEffect } from 'react'
import { getToken } from '../services'
import { useLazyQuery } from '@apollo/client'
import { GET_METADATA } from '../queries'

export const useMetadata = () => {
  const [getResult, { data, loading }] = useLazyQuery(GET_METADATA)

  const getMetadata = async () => {
    const token = await getToken()

    getResult({
      context: {
        headers: {
          authorization: `Bearer ${
            token
          }`
        }
      }
    })
  }

  useEffect(() => {
    getMetadata()
  }, [])

  return {
    data, loading
  }
}
