import player from './playerFactory'
import gameboardFactory from './gameboardFactory'
import gameboardView from './dom'

const p1Grid = document.querySelector('.grid-p1')
const p2Grid = document.querySelector('.grid-p2')

const game = () => {
    const p1 = player('human')
    const p2 = player('computer')

    const p1Board = gameboardFactory()
    const p2Board = gameboardFactory()

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
                    winner = 'Computer Fleet wins!'
                } else if (p2Board.areAllShipsSunk()) {
                    winner = 'Human Fleet wins!'
                }
                p2Grid.removeEventListener('click', attack)
                gameboardView.renderWinner(winner)
            }
        }
    }
    const addAttackEventListener = () => {
        p2Grid.addEventListener('click', (e) => {
            gameboardView.startGame()
            attack(e)
        })
    }

    const autoPlace = () => {
        p1Board.reset()
        p1Board.autoPlaceFleet(p1.getFleet())
        p2Board.autoPlaceFleet(p2.getFleet())
        renderGrids()
        addAttackEventListener()
    }

    return { renderGrids, addAttackEventListener, autoPlace }
}

export default game
