import { Board } from './Board'

export interface Drawable {
  manifest: (board: Board) => void
}
