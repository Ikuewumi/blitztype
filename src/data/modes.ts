import { startTimer } from '@/stores/game'
import { $userTime } from '@/stores/settings'

export interface Mode {
  /** The name of the mode */
  name: string

  /** Time options that the user has for this mode in seconds */
  times: number[]

  /** An optional callback for when a user correctly types in an word */
  onWordComplete?: () => any

}

const classicOnWordComplete = (): void => {
  startTimer($userTime.get())
}

export const MODES: Mode[] = [
  { name: 'classic', times: [5, 3, 2], onWordComplete: classicOnWordComplete },
  { name: 'wordstorm', times: [300, 180, 60] }
]
