const winnerContainer = document.querySelector('.winner-container')
const winnerInfo = document.querySelector('.winner-info')

const gameboardView = (() => {
    const renderCell = (y, x, status) =>
        `<div class="grid-cell cell-${y}-${x} ${status}" data-y='${y}' data-x='${x}'></div>`

    const clearGrid = (parent) => {
        const grid = parent
        grid.textContent = ''
    }

    const renderGrid = (parent, gameboard, type) => {
        clearGrid(parent)
        const board = gameboard.getBoard()
        const { length } = board
        let grid = ''
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                let status = board[i][j]
                if (status === null) {
                    status = ''
                } else if (status.ship) {
                    /*   if (type === 'human') { */
                    status = status.ship.id
                    /*   } else {
                        status = ''
                    } */
                }
                grid += renderCell(i, j, status)
            }
        }
        parent.insertAdjacentHTML('afterbegin', grid)
    }

    const renderWinner = (winner) => {
        winnerContainer.classList.toggle('active')
        winnerInfo.textContent = winner
    }

    return { renderGrid, renderWinner }
})()
export default gameboardView
