export const THEME_KEY = 'theme'
export const getUserTheme = (): number => {
  const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)'
  let userTheme: number

  const lsTheme = localStorage.getItem(THEME_KEY)
  const lsThemeInvalid = (lsTheme == null) || isNaN(Number(lsTheme))

  if (!lsThemeInvalid) {
    userTheme = Number(lsTheme)
  } else {
    const isDarkMode = window.matchMedia(DARK_MODE_MEDIA_QUERY).matches
    userTheme = isDarkMode ? 1 : 0 // The Indices for dark and light modes respectively
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
