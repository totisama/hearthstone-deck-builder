import { API_HOST } from './constants'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getToken = async () => {
  const existingToken = cookies.get('token')
  // console.log('existingToken', existingToken)

  if (existingToken) return existingToken

  // console.log('pasa')
  const formData = new FormData()

  formData.append('grant_type', 'client_credentials')
  formData.append('client_id', import.meta.env.VITE_CLIENT_ID)
  formData.append('client_secret', import.meta.env.VITE_CLIENT_SECRET)

  const response = await fetch(import.meta.env.VITE_OAUTH_TOKEN_HOST, {
    method: 'POST',
    body: formData
  })
  const token = await response.json()
  // console.log(token)

  cookies.set('token', token.access_token, { path: '/', maxAge: token.expires_in })

  return token.access_token
}

export const getCards = async (filters) => {
  const token = await getToken()
  const queryParams = new URLSearchParams({})
  const entries = Object.entries(filters)

  entries.forEach(entry => {
    if (entry[1] !== '') {
      queryParams.append(entry[0], entry[1])
    }
  })
  console.log(queryParams.toString())

  const headers = { Authorization: `Bearer ${token}` }
  const response = await fetch(`${API_HOST}/cards?${queryParams}`, { headers })
  const data = await response.json()

  // console.log('data', data)

  return data
}
