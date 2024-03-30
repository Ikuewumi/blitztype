export const THEME_KEY = 'blitzTypeTheme'
export const getUserTheme = (): number => {
  let userTheme: number

  const lsTheme = localStorage.getItem(THEME_KEY)
  const lsThemeInvalid = (lsTheme == null) || isNaN(Number(lsTheme))

  if (!lsThemeInvalid) {
    userTheme = Number(lsTheme)
  } else {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    userTheme = isDarkMode ? 1 : 0 // The Indices for dark and light modes respectively
  }

  return userTheme
}
