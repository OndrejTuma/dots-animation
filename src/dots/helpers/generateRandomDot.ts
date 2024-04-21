import { Dot } from '../Dot'
import { getRandomInt, getRandomArbitrary } from '.'

export function generateRandomDot(canvasWidth: number, canvasHeight: number) {
  const radius = getRandomInt(3, 7)
  const opacity = getRandomArbitrary(0.3, 1)
  const direction = getRandomArbitrary(0, 2 * Math.PI)
  const velocity = getRandomInt(1, 3)
  const x = getRandomInt(radius, canvasWidth - radius)
  const y = getRandomInt(radius, canvasHeight - radius)

  return new Dot(x, y, radius, opacity, direction, velocity)
}
