import { ships, randomCoordinates } from './gameboardFactory'
import shipFactory from './shipFactory'

const createFleet = (types) => {
    const fleet = {}
    types.forEach((type) => (fleet[type] = shipFactory(type)))
    return fleet
}

const player = (type) => {
    let fleet = createFleet(ships)

    const getType = () => type
    const getFleet = () => fleet

    const attack = (y, x, computerBoard) => computerBoard.receiveAttack(y, x)

    const autoAttack = (humanBoard) => {
        const [y, x] = randomCoordinates()
        const cell = humanBoard.getBoard()[y][x]
        if (cell === 'miss' || cell === 'hit') {
            autoAttack(humanBoard)
        } else {
            humanBoard.receiveAttack(y, x)
        }
    }

    const resetFleet = () => (fleet = createFleet(ships))

    return { getType, getFleet, attack, autoAttack, resetFleet }
}

export default player
