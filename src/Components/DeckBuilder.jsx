import { useEffect } from 'react'
import '../Styles/DeckBuilder.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { HEROS_LIST } from '../constants'
// import NoCards from './NoCards'
import Filters from './Filters'
import StatusBar from './StatusBar'

const DeckBuilder = () => {
  const { hero } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!HEROS_LIST.includes(hero)) {
      navigate('/deckbuilder')
    }
  }, [])

  return (
    <>
      <Filters deckBuilder />
      <StatusBar />
      <main>
        DeckBuilder
      </main>
    </>
  )
}

export default DeckBuilder
