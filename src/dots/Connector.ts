import { Dot } from './Dot'
import { Line } from './Line'

export class Connector {
  private dots: Dot[]
  private maxRadius: number

  constructor(dots: Dot[], maxRadius = 100) {
    this.dots = dots
    this.maxRadius = maxRadius
  }

  connect() {
    this.dots.forEach((dot) => {
      const lines = this._getLines(dot)

      dot.setLines(lines)
    })
  }

  _getLines(dot: Dot): Line[] {
    const [x, y] = dot.getPosition()

    return (
      this.dots
        // Find all Dots in maxRadius
        .filter((candidate) => {
          const [candidateX, candidateY] = candidate.getPosition()

          const distance = Math.sqrt(
            Math.pow(Math.abs(candidateX - x), 2) +
              Math.pow(Math.abs(candidateY - y), 2)
          )

          return distance !== 0 && distance <= this.maxRadius
        })
        // Filter those that already have a Line connection
        .filter((neighbor) => {
          return !neighbor.getLines().find((line) => {
            const [, [lineX, lineY]] = line.getCoordinates()

            return lineX === x && lineY === y
          })
        })
        // Create Lines for remaining neighbors
        .map((neighbor) => {
          const [neighborX, neighborY] = neighbor.getPosition()

          const distance = Math.sqrt(
            Math.pow(Math.abs(neighborX - x), 2) +
              Math.pow(Math.abs(neighborY - y), 2)
          )

          return new Line(
            x,
            y,
            neighborX,
            neighborY,
            1 - distance / this.maxRadius
          )
        })
    )
  }
}
