import { Header } from '../header.js'
import { ListCard } from '../list-card.js'

const root = document.getElementById('root')

root.append(
    Header(),
    ListCard()
)
