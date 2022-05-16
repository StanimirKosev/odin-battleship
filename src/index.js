import game from './factories/game'

const autoPlaceBtn = document.querySelector('.auto-place')
const playAgainBtn = document.querySelector('.play-again')
const link = document.querySelector('.my-link')

game().renderGrids()

autoPlaceBtn.addEventListener('click', () => {
    game().autoPlace()
})

playAgainBtn.addEventListener('click', () => {
    link.click()
})
