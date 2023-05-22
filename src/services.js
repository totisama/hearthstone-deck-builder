import { API_HOST } from './constants'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getToken = async () => {
  const existingToken = cookies.get('token')

  if (existingToken) return existingToken

  const formData = new FormData()

  formData.append('grant_type', 'client_credentials')
  formData.append('client_id', import.meta.env.VITE_CLIENT_ID)
  formData.append('client_secret', import.meta.env.VITE_CLIENT_SECRET)

  const response = await fetch(import.meta.env.VITE_OAUTH_TOKEN_HOST, {
    method: 'POST',
    body: formData
  })
  const token = await response.json()

  cookies.set('token', token.access_token, { path: '/', maxAge: token.expires_in })

  return token.access_token
}

export const getCards = async (queryParams, newPage = false, page = 1) => {
  const token = await getToken()

  if (newPage) {
    queryParams += '&page=' + page
  }

  const headers = { Authorization: `Bearer ${token}` }
  const response = await fetch(`${API_HOST}/cards?${queryParams}`, { headers })
  const data = await response.json()

  return data
}

export const getDeckCodeCardsId = async (deckCardIds, heroId) => {
  const token = await getToken()
  const queryParams = new URLSearchParams({})

  queryParams.append('ids', deckCardIds)
  queryParams.append('hero', heroId)

  const headers = { Authorization: `Bearer ${token}` }
  const response = await fetch(`${API_HOST}/deck?${queryParams}`, { headers })
  const data = await response.json()

  return data.deckCode
}
