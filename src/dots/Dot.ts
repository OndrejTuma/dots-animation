import { Board } from './Board'
import { getMinimalPi, pruneRad } from './helpers'

export class Dot {
  private x: number
  private y: number
  private radius: number
  private opacity: number
  private direction: number
  private velocity: number

  constructor(
    x: number,
    y: number,
    radius: number,
    opacity: number,
    direction: number, // 0 - (2*Math.PI)
    velocity: number
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.direction = direction
    this.opacity = opacity
    this.velocity = velocity
  }

  manifest(board: Board) {
    const ctx = board.getCtx()

    ctx.beginPath()
    ctx.globalAlpha = this.opacity
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  move(board: Board) {
    this.x += Math.cos(this.direction) * this.velocity
    this.y -= Math.sin(this.direction) * this.velocity

    const { width, height } = board.getDimensions()

    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      this.direction = pruneRad(
        this.direction + 2 * Math.PI - 2 * getMinimalPi(this.direction)
      )
    } else if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.direction = pruneRad(
        this.direction + Math.PI - 2 * getMinimalPi(this.direction)
      )
    }

    this.manifest(board)
  }
}
