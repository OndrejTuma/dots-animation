import { Board, Connector } from './dots'
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
  const formdata = new FormData(
    document.getElementById('form') as HTMLFormElement
  )

  const dotsCount = parseInt(formdata.get('dots') as string) ?? 100
  const neighborsRadius =
    parseInt(formdata.get('neighborsRadius') as string) ?? 100
  const minRadius = parseInt(formdata.get('minRadius') as string) ?? 3
  const maxRadius = parseInt(formdata.get('maxRadius') as string) ?? 7
  const minOpacity = parseFloat(formdata.get('minOpacity') as string) ?? 0.3
  const maxOpacity = parseFloat(formdata.get('maxOpacity') as string) ?? 1
  const minVelocity = parseInt(formdata.get('minVelocity') as string) ?? 1
  const maxVelocity = parseInt(formdata.get('maxVelocity') as string) ?? 3

  const dots = generateDots(dotsCount, canvas, {
    minRadius,
    maxRadius,
    minOpacity,
    maxOpacity,
    minVelocity,
    maxVelocity,
  })
  const connector = new Connector(dots, neighborsRadius)

  board.populate(dots, connector)
}
