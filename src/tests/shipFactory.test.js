import shipFactory from '../factories/shipFactory'

// Ship Factory
const ship = shipFactory('carrier')
test('id', () => {
    expect(ship.id).toBe('carrier')
})
test('length', () => {
    expect(ship.length).toBe(5)
})
test('direction', () => {
    expect(ship.getDirection()).toBe('horizontal')
})
test('change direction', () => {
    ship.changeDirection()
    expect(ship.getDirection()).toBe('vertical')
})

// Hit function
test('no hits', () => {
    expect(ship.getHits()).toStrictEqual([null, null, null, null, null])
})
test('one hit', () => {
    ship.hit(4)
    expect(ship.getHits()).toStrictEqual([null, null, null, null, 'hit'])
})

// Sunk function
test('not sunk', () => {
    expect(ship.isSunk()).toBe(false)
})
test('hit but not sunk', () => {
    ship.hit(0)
    expect(ship.isSunk()).toBe(false)
})
test('sunk', () => {
    ship.hit(1)
    ship.hit(2)
    ship.hit(3)
    expect(ship.isSunk()).toBe(true)
})
