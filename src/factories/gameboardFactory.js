export const ships = [
    'carrier',
    'battleship',
    'cruiser',
    'submarine',
    'destroyer',
]

const random = (size) => Math.floor(Math.random() * size) // 0 to 10 int
export const randomCoordinates = (size = 10) => [random(size), random(size)]

const gameboardFactory = () => {
    // create 10x10 grid w/ multidimensional array
    let board = Array(10)
        .fill(null)
        .map(() => Array(10).fill(null))
    const getBoard = () => board

    let placedShips = []
    const areAllShipsPlaced = () => placedShips.length === ships.length

    // based on the which axis is it, from where (coordinates) to where (length / i) to build it
    const adjustCoordinates = (y0, x0, i, direction) => {
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
            const [y, x] = adjustCoordinates(y0, x0, i, direction)
            // check if out of bounds
            if (y < 10 && x < 10) {
                cells.push(board[y][x])
            } else {
                return false
            }
        }
        return cells.every((cell) => cell === null)
    }

    // place ship at coordinates (y, x)
    const placeShip = (ship, y0, x0) => {
        const direction = ship.getDirection()
        const valid = checkValid(ship.length, direction, y0, x0)
        if (valid) {
            for (let i = 0; i < ship.length; i++) {
                const [y, x] = adjustCoordinates(y0, x0, i, direction)
                board[y][x] = { ship, index: i }
            }
            placedShips.push(ship)
            return valid
        }
        return valid
    }

    const receiveAttack = (y, x) => {
        if (board[y][x] === null) {
            board[y][x] = 'miss' // records missed shot
        } else if (board[y][x].ship) {
            board[y][x].ship.hit(board[y][x].index)
            board[y][x] = 'hit' // records hit
        }
        return board[y][x]
    }

    const areAllShipsSunk = () => placedShips.every((ship) => ship.isSunk())

    const reset = () => {
        board = Array(10)
            .fill(null)
            .map(() => Array(10).fill(null))
        placedShips = []
    }

    const autoPlace = (ship) => {
        const [y, x] = randomCoordinates()
        const changeOrient = Math.random() > 0.5
        if (changeOrient) ship.changeDirection()
        const placed = placeShip(ship, y, x)
        if (!placed) autoPlace(ship)
    }

    const autoPlaceFleet = (fleet) => {
        for (const ship in fleet) {
            autoPlace(fleet[ship])
        }
    }

    return {
        getBoard,
        areAllShipsPlaced,
        placeShip,
        receiveAttack,
        areAllShipsSunk,
        reset,
        autoPlaceFleet,
    }
}

export default gameboardFactory
