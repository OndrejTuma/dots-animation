import { Board } from './dots'
import { generateDots } from './dots/helpers'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const dots = generateDots(50, canvas)

const board = new Board(canvas)
board.populate(dots)

document.body.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowRight':
      return board.start()
    case 'ArrowLeft':
      return board.stop()
  }
})
