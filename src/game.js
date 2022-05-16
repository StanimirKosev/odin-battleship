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

    const attack = (e) => {
        const cell = e.target
        if (cell.classList.contains('grid-cell')) {
            const { y } = cell.dataset
            const { x } = cell.dataset

            const boardCell = p2Board.getBoard()[y][x]
            if (boardCell !== 'miss' && boardCell !== 'hit') {
                p1.attack(y, x, p2Board)
                p2.autoAttack(p1Board)

                renderGrids()
            }
            if (p1Board.areAllShipsSunk() || p2Board.areAllShipsSunk()) {
                let winner = ''
                if (p1Board.areAllShipsSunk()) {
                    winner = 'Computer wins!'
                } else if (p2Board.areAllShipsSunk()) {
                    winner = 'Human wins!'
                }
                p2Grid.removeEventListener('click', attack)
                gameboardView.renderWinner(winner)
            }
        }
    }

    const addAttackEventListener = () => {
        p2Grid.addEventListener('click', attack)
    }

    return { renderGrids, addAttackEventListener }
}

export default game
