import { Board } from './Board'
import { Drawable } from './types'

export class Line implements Drawable {
  private fromX: number
  private fromY: number
  private toX: number
  private toY: number
  private opacity: number

  constructor(fromX: number, fromY: number, toX: number, toY: number, opacity: number = 1) {
    this.fromX = fromX
    this.fromY = fromY
    this.toX = toX
    this.toY = toY
    this.opacity = opacity
  }
  
  manifest(board: Board) {
    const ctx = board.getCtx()

    ctx.beginPath()
    ctx.moveTo(this.fromX, this.fromY)
    ctx.lineTo(this.toX, this.toY)
    ctx.globalAlpha = this.opacity
    ctx.stroke()
  }
}