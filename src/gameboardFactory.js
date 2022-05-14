const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

const gameboardFactory = () => {
    // create 10x10 grid
    const board = Array(10)
        .fill(null)
        .map(() => Array(10).fill(null))
    const getBoard = () => board

    const placedShips = []
    const areAllShipsPlaced = () => placedShips.length === ships.length

    const adjustCoords = (y0, x0, i, direction) => {
        // default - horizontal
        let x = x0 + i
        let y = y0
        if (direction === 'vertical') {
            x = x0
            y = y0 + i
        }
        return [y, x]
    }

    const checkValid = (length, direction, y0, x0) => {
        const cells = []
        for (let i = 0; i < length; i++) {
            const [y, x] = adjustCoords(y0, x0, i, direction)
            if (y < 10 && x < 10) {
                cells.push(board[y][x])
            } else {
                return false
            }
        }
        return cells.every((cell) => cell === null)
    }

    // place ship at coords (y, x)
    const placeShip = (ship, y0, x0) => {
        const direction = ship.getDirection()
        const valid = checkValid(ship.length, direction, y0, x0)
        if (valid) {
            for (let i = 0; i < ship.length; i++) {
                const [y, x] = adjustCoords(y0, x0, i, direction)
                board[y][x] = { ship, index: i }
            }
            placedShips.push(ship)
            return valid
        }
        return valid
    }

    return { getBoard, areAllShipsPlaced, placeShip }
}

export default gameboardFactory
