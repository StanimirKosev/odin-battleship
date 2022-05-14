import gameboardFactory from '../gameboardFactory'
import shipFactory from '../shipFactory'

describe('Gameboard', () => {
    // getBoard() tests
    describe('board', () => {
        const gameboard = gameboardFactory()
        test('empty board', () => {
            const board = gameboard
                .getBoard()
                .every((square) => square === null)
            expect(board).toBe(false)
        })
        test('board row', () => {
            const board = gameboard.getBoard().length
            expect(board).toBe(10)
        })
        test('board column', () => {
            const board = gameboard.getBoard()[0].length
            expect(board).toBe(10)
        })
    })

    // placeShip() tests
    describe('place horizontal ship', () => {
        const gameboard = gameboardFactory()
        const ship = shipFactory('battleship')
        gameboard.placeShip(ship, 3, 2)

        test('battleship 1/4 w/index:0 ', () => {
            const board = gameboard.getBoard()[3][2]
            expect(board).toEqual({ ship, index: 0 })
        })
        test('battleship 2/4 w/index: 1', () => {
            const board = gameboard.getBoard()[3][3]
            expect(board).toEqual({ ship, index: 1 })
        })
        test('battleship 3/4 w/index: 2', () => {
            const board = gameboard.getBoard()[3][4]
            expect(board).toEqual({ ship, index: 2 })
        })
        test('battleship 4/4 w/index: 3', () => {
            const board = gameboard.getBoard()[3][5]
            expect(board).toEqual({ ship, index: 3 })
        })
    })
    describe('place vertical ship', () => {
        const gameboard = gameboardFactory()
        const ship = shipFactory('destroyer')
        ship.changeDirection()
        gameboard.placeShip(ship, 3, 2)

        test('destoyer 1/2 w/index:0', () => {
            const board = gameboard.getBoard()[3][2]
            expect(board).toEqual({ ship, index: 0 })
        })
        test('destoyer 2/2 w/index:1', () => {
            const board = gameboard.getBoard()[4][2]
            expect(board).toEqual({ ship, index: 1 })
        })
    })
    describe('Not placing out of bounds', () => {
        const gameboard = gameboardFactory()
        const ship = shipFactory('submarine')

        test('out of bounds - horizontal', () => {
            gameboard.placeShip(ship, 9, 9) // [9,9], [9,10] , [9,11] <-- won't place it
            const board = gameboard.getBoard()[9][9]
            expect(board).toEqual(null)
        })
        test('out of bounds - vertical', () => {
            ship.changeDirection()
            gameboard.placeShip(ship, 9, 9) // [9,9], [10,9] , [11,9] <-- won't place it
            const board = gameboard.getBoard()[9][9]
            expect(board).toEqual(null)
        })
    })
    describe('Not placing if collision with ship', () => {
        const gameboard = gameboardFactory()
        const cruiser = shipFactory('cruiser') // [1,0] [1,1] [1,2] <-- collision [1,2]
        const carrier = shipFactory('carrier')

        test('collision w/ship', () => {
            gameboard.placeShip(cruiser, 1, 0)
            gameboard.placeShip(carrier, 1, 0)
            const board = gameboard.getBoard()[1][0]
            expect(board).toEqual({ ship: cruiser, index: 0 })
        })
        test('collision with ship in only 1 place', () => {
            carrier.changeDirection()
            gameboard.placeShip(carrier, 0, 2) // [0,2] [1,2] [2,2] [3,2] [4,2] <-- collision [1,2]
            const board = gameboard.getBoard()[0][2]
            expect(board).toEqual(null)
        })
    })

    // areAllShipsPlaced() tests
    describe('All ships placed', () => {
        const gameboard = gameboardFactory()
        const carrier = shipFactory('carrier')
        const battleship = shipFactory('battleship')
        const cruiser = shipFactory('cruiser')
        const submarine = shipFactory('submarine')
        const destroyer = shipFactory('destroyer')

        test('no ships placed', () => {
            const shipsPlaced = gameboard.areAllShipsPlaced()
            expect(shipsPlaced).toBe(false)
        })
        test('samo ships are placed', () => {
            gameboard.placeShip(carrier, 0, 0)
            gameboard.placeShip(battleship, 1, 0)
            const shipsPlaced = gameboard.areAllShipsPlaced()
            expect(shipsPlaced).toBe(false)
        })
        test('all ships placed', () => {
            gameboard.placeShip(cruiser, 2, 0)
            gameboard.placeShip(submarine, 3, 0)
            gameboard.placeShip(destroyer, 4, 0)
            const shipsPlaced = gameboard.areAllShipsPlaced()
            expect(shipsPlaced).toBe(true)
        })
    })
})
