export interface Theme {
  /** Name of the Theme */
  name: string

  /** the background, and text color of the theme respectively */
  colors: [string, string]
}

export const THEMES = [
  { name: 'Classic', colors: ['0deg 0% 96%', '0deg 0% 7%'] },
  { name: 'Dark', colors: ['0deg 0% 7%', '0deg 0% 97%'] }
] as Theme[]
