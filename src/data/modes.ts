export interface Mode {
  /** The name of the mode */
  name: string

  /** Time options that the user has for this mode in seconds */
  times: number[]
}

export const MODES: Mode[] = [
  { name: 'classic', times: [5, 3, 2] },
  { name: 'wordstorm', times: [300, 180, 60] }
]
