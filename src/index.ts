import { Board } from './dots'
import { Connector } from './dots/Connector'
import { generateDots } from './dots/helpers'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const board = new Board(canvas)

;(document.getElementById('start') as HTMLButtonElement).addEventListener(
  'click',
  () => {
    manifestBoard()
    board.start()
  }
)
;(document.getElementById('stop') as HTMLButtonElement).addEventListener(
  'click',
  () => board.stop()
)

manifestBoard()

function manifestBoard() {
  const dotsCount =
    parseInt((document.getElementById('dots') as HTMLInputElement).value) ?? 0
  const maxRadius =
    parseInt(
      (document.getElementById('maxRadius') as HTMLInputElement).value
    ) ?? 0
    
  const dots = generateDots(dotsCount, canvas)
  const connector = new Connector(dots, maxRadius)

  board.populate(dots, connector)
}
