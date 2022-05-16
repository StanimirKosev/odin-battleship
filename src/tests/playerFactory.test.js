import player from '../factories/playerFactory'
import gameboardFactory from '../factories/gameboardFactory'

const human = player('human')
const computer = player('computer')
const humanBoard = gameboardFactory()
const computerBoard = gameboardFactory()

// getType() tests
describe('Player type', () => {
    test('Human type', () => {
        const entity = human.getType()
        expect(entity).toBe('human')
    })
    test('Computer type', () => {
        const entity = computer.getType()
        expect(entity).toBe('computer')
    })
})

//  attack() test
describe('Human attack', () => {
    test('attack computer', () => {
        human.attack(2, 3, computerBoard)
        const board = computerBoard.getBoard()[2][3]
        expect(board).toBe('miss')
    })
})

// autoAttack() test
describe('Auto attack', () => {
    test('attack human', () => {
        computer.autoAttack(humanBoard)
        const board = humanBoard
            .getBoard()
            .flat()
            .every((cell) => cell === null)
        expect(board).toBe(false)
    })
})

// getFleet() test
describe('Reset Fleet', () => {
    test('player fleets  w/ no reset are equal', () => {
        const fleet1 = human.getFleet()
        const fleet2 = human.getFleet()

        const fleets = fleet1 === fleet2
        expect(fleets).toBe(true)
    })
    // resetFleet() test
    test('player fleets after reset are NOT equal', () => {
        const fleet1 = human.getFleet()
        human.resetFleet()
        const fleet2 = human.getFleet()

        const fleets = fleet1 === fleet2
        expect(fleets).toBe(false)
    })
})
