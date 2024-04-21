import { Connector } from './Connector'
import { Dot } from './Dot'

export class Board {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private dots: Dot[]
  private animationInterval: NodeJS.Timeout
  private connector: Connector

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
  }

  getCtx() {
    return this.ctx
  }
  getDimensions() {
    return {
      height: this.height,
      width: this.width,
    }
  }

  populate(dots: Dot[], connector?: Connector) {
    this.dots = dots
    this.connector = connector

    this.connector?.connect()
    this.dots.forEach((dot) => dot.manifest(this))
  }

  start() {
    this.animationInterval = setInterval(
      () => window.requestAnimationFrame(this._redraw.bind(this)),
      20
    )
  }
  stop() {
    clearInterval(this.animationInterval)
  }

  _redraw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.connector?.connect()
    this.dots.forEach((dot) => dot.move(this))
  }
}
