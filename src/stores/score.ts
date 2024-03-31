import { map } from 'nanostores'

const defaultScore = { currentScore: 0, highScore: 0 }
export const $scores = map(defaultScore)
