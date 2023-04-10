import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './Styles/Index.scss'
import { API_HOST } from './constants'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const restLink = new RestLink({ uri: API_HOST })

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)
