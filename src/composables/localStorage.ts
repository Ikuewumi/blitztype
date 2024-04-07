import { THEMES } from '@/data/themes'
import { checkIndexValidity } from './utils'

export const THEME_KEY = 'theme'
export const getUserTheme = (): number => {
  const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)'
  const isDarkMode = window.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? 1 : 0 // The Indices for dark and light modes respectively

  let userTheme: number

  const lsTheme = localStorage.getItem(THEME_KEY)
  const lsThemeInvalid = (lsTheme == null) || isNaN(Number(lsTheme))

  if (!lsThemeInvalid) {
    userTheme = Number(lsTheme)
  } else {
    userTheme = isDarkMode
  }

  // Default if The Number gotten doesn't actually correspond to an index
  try {
    checkIndexValidity(userTheme, THEMES)
  } catch {
    userTheme = isDarkMode
  }

  return userTheme
}

export const HIGH_SCORE_BASE = 'high-score'
export const getModeStorageKey = (mode: number, time: number): string => `${HIGH_SCORE_BASE}-mode-${mode}-time-${time}`
export const getHighScore = (mode: number, time: number): number => {
  let highScore: number = 0

  const lsHighScore = localStorage.getItem(getModeStorageKey(mode, time))
  const lsHighScoreInvalid = lsHighScore == null || isNaN(Number(lsHighScore)) || Number(lsHighScore) < 0

  if (!lsHighScoreInvalid) {
    highScore = Number(lsHighScore)
  }

  return highScore
}
