import { Board } from './dots'
import { Connector } from './dots/Connector'
import { generateDots } from './dots/helpers'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const dots = generateDots(200, canvas)
const connector = new Connector(dots, 100)

const board = new Board(canvas)
board.populate(dots, connector)

document.body.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowRight':
      return board.start()
    case 'ArrowLeft':
      return board.stop()
  }
})
