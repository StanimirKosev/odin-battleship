import player from './playerFactory'
import gameboardFactory from './gameboardFactory'
import shipFactory from './shipFactory'
import gameboardView from './dom'

const p1Grid = document.querySelector('.grid-p1')
const p2Grid = document.querySelector('.grid-p2')

const game = () => {
    // create players
    const p1 = player('human')
    const p2 = player('computer')

    // create boards
    const p1Board = gameboardFactory()
    const p2Board = gameboardFactory()

    // predetermined coordinates
    const carrier = shipFactory('carrier')
    p1Board.placeShip(carrier, 0, 0)
    const battleship = shipFactory('battleship')
    p2Board.placeShip(battleship, 0, 0)

    const renderGrids = () => {
        gameboardView.renderGrid(p1Grid, p1Board, p1.getType())
        gameboardView.renderGrid(p2Grid, p2Board, p2.getType())
    }
    return { renderGrids }
}

export default game
