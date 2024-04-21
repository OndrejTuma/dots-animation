import { generateRandomDot } from '.'
import { Dot } from '../Dot'

export function generateDots(dots: number, canvas: HTMLCanvasElement): Dot[] {
  return Array.from({ length: dots }).map(() =>
    generateRandomDot(canvas.width, canvas.height)
  )
}
