import { generateRandomDot } from '.'
import { Dot } from '../Dot'
import type { DotConfigType } from './generateRandomDot'

export function generateDots(
  dots: number,
  canvas: HTMLCanvasElement,
  dotConfig?: DotConfigType
): Dot[] {
  return Array.from({ length: dots }).map(() =>
    generateRandomDot(canvas.width, canvas.height, dotConfig)
  )
}
