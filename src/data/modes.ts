import { throwConfetti } from '@/composables/utils'
import { startTimer } from '@/stores/game'
import { $indices, $userTime } from '@/stores/settings'
import { showMessage } from '@/stores/toast'
import { $SUBJECTS } from './subjects'
import { $scores } from '@/stores/score'

export interface Mode {
  /** The name of the mode */
  name: string

  /** Time options that the user has for this mode in seconds */
  times: number[]

  /** An optional callback for when a user correctly types in an word */
  onWordComplete?: () => any

  /** An optional callback for when a user finishes all the words in a mode */
  onModeComplete?: () => any
}

const classicOnWordComplete = (): void => {
  startTimer($userTime.get())
}

const wordStormOnModeComplete = (): void => {
  console.info('mode completed!')
  const WORDSTORM_CELEBRATION_TIME = 3000
  const WORDSTORM_CELEBRATION_MSG = (): string => `
    "You finished ${$SUBJECTS.get()[$indices.get().subject].name}" in ${$scores.get().currentScore} words
  `
  void throwConfetti(WORDSTORM_CELEBRATION_TIME)
  void showMessage(WORDSTORM_CELEBRATION_MSG(), WORDSTORM_CELEBRATION_TIME)
}

export const MODES: Mode[] = [
  { name: 'classic', times: [5, 3, 2], onWordComplete: classicOnWordComplete, onModeComplete: wordStormOnModeComplete },
  { name: 'wordstorm', times: [300, 180, 60], onModeComplete: wordStormOnModeComplete }
]
