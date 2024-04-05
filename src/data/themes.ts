export interface Theme {
  /** Name of the Theme */
  name: string

  /** the background, and text color of the theme respectively */
  colors: [string, string]
}

export const THEMES = [
  { name: 'Classic', colors: ['0deg 0% 100%', '0deg 0% 7%'] },
  { name: 'Dark', colors: ['0deg 0% 7%', '0deg 0% 97%'] },
  { name: 'Sepia', colors: ['42deg 62% 89%', '42deg 30% 7%'] },
  { name: 'Dlue', colors: ['210deg 15% 10%', '240deg 3% 92%'] }
] as Theme[]
