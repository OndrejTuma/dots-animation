import { Dot } from '../Dot'
import { getRandomInt, getRandomArbitrary } from '.'

export type DotConfigType = {
  minRadius: number
  maxRadius: number
  minOpacity: number
  maxOpacity: number
  minVelocity: number
  maxVelocity: number
}

export function generateRandomDot(
  canvasWidth: number,
  canvasHeight: number,
  dotConfig?: DotConfigType
) {
  const {
    minRadius = 3,
    maxRadius = 7,
    minOpacity = 0.3,
    maxOpacity = 1,
    minVelocity = 1,
    maxVelocity = 3,
  } = dotConfig

  const radius = getRandomInt(minRadius, maxRadius)
  const opacity = getRandomArbitrary(minOpacity, maxOpacity)
  const direction = getRandomArbitrary(0, 2 * Math.PI)
  const velocity = getRandomInt(minVelocity, maxVelocity)
  const x = getRandomInt(radius, canvasWidth - radius)
  const y = getRandomInt(radius, canvasHeight - radius)

  return new Dot(x, y, radius, opacity, direction, velocity)
}
